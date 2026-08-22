import {parseUseRecord} from "src/libraries/helpers/parseUseRecord";
import {RawUseRecord} from "src/libraries/types/savedata/useRecord";

describe("parseUseRecord", () => {
    it("should parse raw usage info with date strings to Date objects", () => {
        const rawUseRecord: RawUseRecord = {
            firstUse: "2023-01-01T10:00:00.000Z",
            lastUse: "2023-01-02T15:30:00.000Z",
            timesUsed: 5
        };

        const result = parseUseRecord(rawUseRecord);

        expect(result.firstUse).toEqual(new Date("2023-01-01T10:00:00.000Z"));
        expect(result.lastUse).toEqual(new Date("2023-01-02T15:30:00.000Z"));
        expect(result.timesUsed).toBe(5);
    });

    it("should preserve additional properties from the input object", () => {
        const rawUseRecordWithExtra = {
            firstUse: "2023-01-01T10:00:00.000Z",
            lastUse: "2023-01-02T15:30:00.000Z",
            timesUsed: 3,
            extraProperty: "test",
            anotherProp: 42
        };

        const result = parseUseRecord(rawUseRecordWithExtra);

        expect(result.firstUse).toEqual(new Date("2023-01-01T10:00:00.000Z"));
        expect(result.lastUse).toEqual(new Date("2023-01-02T15:30:00.000Z"));
        expect(result.timesUsed).toBe(3);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle ISO date strings without milliseconds", () => {
        const rawUseRecord: RawUseRecord = {
            firstUse: "2023-01-01T10:00:00Z",
            lastUse: "2023-01-02T15:30:00Z",
            timesUsed: 1
        };

        const result = parseUseRecord(rawUseRecord);

        expect(result.firstUse).toEqual(new Date("2023-01-01T10:00:00Z"));
        expect(result.lastUse).toEqual(new Date("2023-01-02T15:30:00Z"));
    });

    it("should handle dates with timezone offsets", () => {
        const rawUseRecord: RawUseRecord = {
            firstUse: "2023-01-01T10:00:00+02:00",
            lastUse: "2023-01-02T15:30:00-05:00",
            timesUsed: 2
        };

        const result = parseUseRecord(rawUseRecord);

        expect(result.firstUse).toEqual(new Date("2023-01-01T10:00:00+02:00"));
        expect(result.lastUse).toEqual(new Date("2023-01-02T15:30:00-05:00"));
    });

    it("should handle zero use count", () => {
        const rawUseRecord: RawUseRecord = {
            firstUse: "2023-01-01T10:00:00.000Z",
            lastUse: "2023-01-01T10:00:00.000Z",
            timesUsed: 0
        };

        const result = parseUseRecord(rawUseRecord);

        expect(result.timesUsed).toBe(0);
        expect(result.firstUse).toEqual(result.lastUse);
    });

    it("should handle same first and last used dates", () => {
        const sameDate = "2023-01-01T10:00:00.000Z";
        const rawUseRecord: RawUseRecord = {
            firstUse: sameDate,
            lastUse: sameDate,
            timesUsed: 1
        };

        const result = parseUseRecord(rawUseRecord);

        expect(result.firstUse).toEqual(result.lastUse);
        expect(result.firstUse).toEqual(new Date(sameDate));
    });
});
