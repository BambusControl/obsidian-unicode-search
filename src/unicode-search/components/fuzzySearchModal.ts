import {App, Editor, renderMatches, SuggestModal} from "obsidian";
import {MetaCharacterSearchResult} from "./characterSearch";
import {CharacterService} from "../service/characterService";
import {
    ELEMENT_FAVORITE,
    ELEMENT_FREQUENT,
    ELEMENT_RECENT,
    INSERT_CHAR_INSTRUCTION,
    INSTRUCTION_DISMISS,
    NAVIGATE_INSTRUCTION
} from "./visualElements";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {getRandomItem} from "../../libraries/helpers/getRandomItem";
import {fillNullCharacterMatchScores} from "../../libraries/comparison/fillNullCharacterMatchScores";
import {compareCharacterMatches} from "../../libraries/comparison/compareCharacterMatches";
import {ReadCache} from "../../libraries/types/readCache";
import {mostRecentUses} from "../../libraries/helpers/mostRecentUses";
import {averageUseCount} from "../../libraries/helpers/averageUseCount";
import {UsageDisplayStatistics} from "../../libraries/types/usageDisplayStatistics";
import {toNullMatch} from "../../libraries/helpers/toNullMatch";
import {toSearchQueryMatch} from "../../libraries/helpers/toSearchQueryMatch";
import {matchedNameOrCodepoint} from "../../libraries/helpers/matchedNameOrCodepoint";

import {ParsedUsageInfo} from "../../libraries/types/savedata/parsedUsageInfo";
import { ParsedFavoriteInfo } from "src/libraries/types/savedata/parsedFavoriteInfo";

export class FuzzySearchModal extends SuggestModal<MetaCharacterSearchResult> {
    private readonly usageStatistics: ReadCache<UsageDisplayStatistics>;

    public constructor(
        app: App,
        private readonly editor: Editor,
        private readonly characterService: CharacterService,
    ) {
        super(app);

        super.setInstructions([
            NAVIGATE_INSTRUCTION,
            INSERT_CHAR_INSTRUCTION,
            INSTRUCTION_DISMISS,
        ]);

        // Purposefully ignored result
        this.setRandomPlaceholder().then();

        this.usageStatistics = new ReadCache(async () => {
            const usedCharacters = await characterService.getUsed();
            return {
                topThirdRecentlyUsed: mostRecentUses(usedCharacters).slice(0, 3).last() ?? new Date(0),
                averageUseCount: averageUseCount(usedCharacters),
            } as UsageDisplayStatistics;
        });
    }

    public override async getSuggestions(query: string): Promise<MetaCharacterSearchResult[]> {
        const allCharacters = (await this.characterService.getAll());
        const queryEmpty = query == null || query.length < 1;

        const prepared = queryEmpty
            ? allCharacters
                .map(toNullMatch)
            : allCharacters
                .map(toSearchQueryMatch(query))
                .filter(matchedNameOrCodepoint);

        const recencyCutoff = (await this.usageStatistics.get()).topThirdRecentlyUsed;

        return prepared
            .sort((l, r) => compareCharacterMatches(l, r, recencyCutoff))
            .slice(0, this.limit)
            .map(fillNullCharacterMatchScores);
    }

    public override async renderSuggestion(search: MetaCharacterSearchResult, container: HTMLElement): Promise<void> {
        const char = search.character;

        container.addClass("plugin", "unicode-search", "result-item");

        container.createDiv({
            cls: "character-preview",
        }).createSpan({
            text: char.codepoint,
        });

        const matches = container.createDiv({
            cls: "character-match",
        });

        const text = matches.createDiv({
            cls: "character-name",
        });

        renderMatches(text, char.name, search.match.name.matches);

        const codepoint = matches.createDiv({
            cls: "character-codepoint",
        });

        renderMatches(codepoint, toHexadecimal(char), search.match.codepoint.matches);

        const detail = container.createDiv({
            cls: "detail",
        });

		const attributes = detail.createDiv({
			cls: "attributes",
		});

		const maybeFavoriteChar = char as Partial<ParsedFavoriteInfo>;
		const showFavorite = maybeFavoriteChar.hotkey != null && maybeFavoriteChar.hotkey;

		if (showFavorite) {
			attributes.createDiv(ELEMENT_FAVORITE);
		} else {
            const usageStats = await this.usageStatistics.get();

            /* The type hinting doesn't work, and shows as an error in the IDE (or the type is wrong) */
            const maybeUsedChar = char as Partial<ParsedUsageInfo>
            const showLastUsed = maybeUsedChar.lastUsed != null && maybeUsedChar.lastUsed >= usageStats.topThirdRecentlyUsed;
            const showUseCount = maybeUsedChar.useCount != null && maybeUsedChar.useCount >= usageStats.averageUseCount;

            if (showLastUsed) {
                attributes.createDiv(ELEMENT_RECENT);
            }

            if (showUseCount) {
                attributes.createDiv(ELEMENT_FREQUENT);
            }
        }
    }

    public override async onChooseSuggestion(search: MetaCharacterSearchResult, evt: MouseEvent | KeyboardEvent): Promise<void> {
        this.editor.replaceSelection(search.character.codepoint);

        try {
            await this.characterService.recordUsage(search.character.codepoint);
        } catch (error) {
            console.error("Failed to record character usage", {err: error});
        }
    }

    public override async onNoSuggestion(): Promise<void> {
        await this.setRandomPlaceholder();
    }

    private async setRandomPlaceholder(): Promise<void> {
        const randomCharacterName = getRandomItem(await this.characterService.getAllCharacters()).name;
        super.setPlaceholder(`Unicode search: ${randomCharacterName}`);
    }

}
