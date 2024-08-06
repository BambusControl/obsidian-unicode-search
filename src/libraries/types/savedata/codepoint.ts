import {CodepointKey} from "../codepoint/codepointKey";
import {UsageInfo} from "./usageInfo";
import {ParsedUsageInfo} from "./parsedUsageInfo";
import {FavoriteInfo} from "./favoriteInfo";
import {ParsedFavoriteInfo} from "./parsedFavoriteInfo";

export type CodepointUsage = CodepointKey & UsageInfo
export type CodepointParsedUsage = CodepointKey & ParsedUsageInfo

export type CodepointFavorite = CodepointKey & FavoriteInfo
export type CodepointParsedFavorite = CodepointKey & ParsedFavoriteInfo
