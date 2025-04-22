import {FavoriteInfo, ParsedFavoriteInfo} from "../savedata/favoriteInfo";
import {ParsedUsageInfo, UsageInfo} from "../savedata/usageInfo";
import {CodepointKey} from "./unicode";

export type CodepointUsage = CodepointKey & UsageInfo;
export type CodepointParsedUsage = CodepointKey & ParsedUsageInfo;
export type CodepointFavorite = CodepointKey & FavoriteInfo;
export type CodepointParsedFavorite = CodepointKey & ParsedFavoriteInfo;
