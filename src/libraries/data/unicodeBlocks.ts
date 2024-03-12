import {UnicodeBlock} from "../types/unicodeBlock";
import {UNICODE_PLANES_ALL} from "./unicodePlanes";

export const UNICODE_BLOCK_ALL: UnicodeBlock[] = UNICODE_PLANES_ALL.flatMap(plane => plane.blocks);
