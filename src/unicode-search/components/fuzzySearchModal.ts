import {App, Editor, prepareFuzzySearch, prepareSimpleSearch, renderMatches, SuggestModal} from "obsidian";
import {CharacterMatch, NONE_RESULT} from "./characterMatch";
import {CharacterService} from "../service/characterService";
import {INSERT_CHAR_INSTRUCTION, INSTRUCTION_DISMISS, NAVIGATE_INSTRUCTION} from "./visualElements";
import {toHexadecimal} from "../../libraries/helpers/toHexadecimal";
import {getRandomItem} from "../../libraries/helpers/getRandomItem";

export class FuzzySearchModal extends SuggestModal<CharacterMatch> {

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
    }

    public override async getSuggestions(query: string): Promise<CharacterMatch[]> {
        console.count("QFuzzySearchModal.getSuggestions")
        const isHexSafe = query.length <= 4 && !query.contains(" ")

        const codepointSearch = isHexSafe ? prepareSimpleSearch(query) : ((text: string) => null);
        const fuzzyNameSearch = prepareFuzzySearch(query);

        return (await this.characterService.getSorted())
            .map(character => ({
                item: character,
                match: {
                    codepoint: codepointSearch(toHexadecimal(character)),
                    name: fuzzyNameSearch(character.name)
                }
            }))
            .filter(result => result.match.name != null || result.match.codepoint != null)
            .map(result => {
                /* Fill with empty result, so that we don't have to deal with null values */
                result.match.name ??= NONE_RESULT
                result.match.codepoint ??= NONE_RESULT
                return result as CharacterMatch
            })
            .sort((l, r) =>
                /* Matches are scored with negative values up to 0, with 0 meaning full match for fuzzy search */
                (r.match.codepoint.score - l.match.codepoint.score) + (r.match.name.score - l.match.name.score)
            )
    }

    public override async renderSuggestion(item: CharacterMatch, container: HTMLElement): Promise<void> {
        const char = item.item;

        container.addClass("plugin", "unicode-search", "result-item")

        container.createDiv({
            cls: "character-preview",
        }).createSpan({
            text: char.codepoint,
        });

        const matches = container.createDiv({
            cls: "character-match",
        })

        const text = matches.createDiv({
            cls: "character-name",
        });

        renderMatches(text, item.item.name, item.match.name.matches)

        if (item.match.codepoint.matches.length > 0) {
            const codepoint = matches.createDiv({
                cls: "character-codepoint",
            });

            renderMatches(codepoint, toHexadecimal(item.item), item.match.codepoint.matches);
        }

        const detail = container.createDiv({
            cls: "detail",
        });

        const attributes = detail.createDiv({
            cls: "attributes",
        });

        /* TODO [NEXT]: Sorting, with usage data; prioritize used characters, merge with the rest for search. */
    }

    public override onChooseSuggestion(item: CharacterMatch, evt: MouseEvent | KeyboardEvent): void {
        this.editor.replaceSelection(item.item.codepoint);

        // I don't want to await this, its more of a side effect
        this.characterService.recordUsage(item.item.codepoint)
            .then(undefined, (error) => console.error("Failed to record character usage", {err: error}));
    }

    public override async onNoSuggestion(): Promise<void> {
        await this.setRandomPlaceholder();
    }

    private async setRandomPlaceholder(): Promise<void> {
        const placeholder = `Unicode search: ${getRandomItem((await this.characterService.getAllCharacters())).name}`;
        super.setPlaceholder(placeholder);
    }

}
