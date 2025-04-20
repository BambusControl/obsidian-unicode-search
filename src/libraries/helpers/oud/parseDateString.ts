import {DateString} from "../../types/savedata/oud/usageInfo";

/* TODO [NEXT]: This had to be used somewhere */
//noinspection JSUnusedGlobalSymbols
export function parseDateString(value: DateString | null | undefined): Date | null {
    if (value == null) {
        return null;
    }

    const date = new Date(value);

    return isNaN(date.valueOf())
        ? null
        : date;
}
