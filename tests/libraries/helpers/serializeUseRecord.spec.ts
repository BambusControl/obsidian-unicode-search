import { serializeUseRecord } from "src/libraries/helpers/serializeUseRecord";
import { RawUseRecord, UseRecord } from "src/libraries/types/savedata/useRecord";

describe("serializeUseRecord", () => {
    it("should serialize usage info with Date objects to date strings", () => {
        const usageInfo: UseRecord = {
            firstUse: new Date("2023-01-01T10:00:00.000Z"),
            lastUse: new Date("2023-01-02T15:30:00.000Z"),
            timesUsed: 5
        };

        const result = serializeUseRecord(usageInfo);

        expect(result.firstUse).toBe("2023-01-01T10:00:00.000Z");
        expect(result.lastUse).toBe("2023-01-02T15:30:00.000Z");
        expect(result.timesUsed).toBe(5);
    });

    it("should preserve additional properties from the input object", () => {
        const usageInfoWithExtra = {
            firstUse: new Date("2023-01-01T10:00:00.000Z"),
            lastUse: new Date("2023-01-02T15:30:00.000Z"),
            timesUsed: 3,
            extraProperty: "test",
            anotherProp: 42
        };

        const result = serializeUseRecord(usageInfoWithExtra);

        expect(result.firstUse).toBe("2023-01-01T10:00:00.000Z");
        expect(result.lastUse).toBe("2023-01-02T15:30:00.000Z");
        expect(result.timesUsed).toBe(3);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle dates with different timezones correctly", () => {
        const usageInfo: UseRecord = {
            firstUse: new Date("2023-01-01T10:00:00+02:00"),
            lastUse: new Date("2023-01-02T15:30:00-05:00"),
            timesUsed: 2
        };

        const result = serializeUseRecord(usageInfo);

        // Dates should be serialized to ISO strings in UTC
        expect(result.firstUse).toBe(new Date("2023-01-01T10:00:00+02:00").toJSON());
        expect(result.lastUse).toBe(new Date("2023-01-02T15:30:00-05:00").toJSON());
    });

    it("should handle zero use count", () => {
        const usageInfo: UseRecord = {
            firstUse: new Date("2023-01-01T10:00:00.000Z"),
            lastUse: new Date("2023-01-01T10:00:00.000Z"),
            timesUsed: 0
        };

        const result = serializeUseRecord(usageInfo);

        expect(result.timesUsed).toBe(0);
        expect(result.firstUse).toBe(result.lastUse);
    });

    it("should handle same first and last used dates", () => {
        const sameDate = new Date("2023-01-01T10:00:00.000Z");
        const usageInfo: UseRecord = {
            firstUse: sameDate,
            lastUse: sameDate,
            timesUsed: 1
        };

        const result = serializeUseRecord(usageInfo);

        expect(result.firstUse).toBe(result.lastUse);
        expect(result.firstUse).toBe("2023-01-01T10:00:00.000Z");
    });

    it("should roundtrip correctly with parseUseRecord", () => {
        const originalUseRecord: UseRecord = {
            firstUse: new Date("2023-01-01T10:00:00.000Z"),
            lastUse: new Date("2023-01-02T15:30:00.000Z"),
            timesUsed: 5
        };

        const serialized = serializeUseRecord(originalUseRecord);

        // Verify serialized format
        expect(typeof serialized.firstUse).toBe("string");
        expect(typeof serialized.lastUse).toBe("string");

        // Import parseUseRecord to test roundtrip
        const { parseUseRecord } = require("../../../src/libraries/helpers/parseUseRecord");
        const parsed = parseUseRecord(serialized);

        expect(parsed.firstUse).toEqual(originalUseRecord.firstUse);
        expect(parsed.lastUse).toEqual(originalUseRecord.lastUse);
        expect(parsed.timesUsed).toBe(originalUseRecord.timesUsed);
    });
});
