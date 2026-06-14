import { serializeUsageInfo } from "src/libraries/helpers/serializeUsageInfo";
import { UsageInfo } from "src/libraries/types/savedata/usageInfo";

describe("serializeUsageInfo", () => {
    it("should serialize usage info with Date objects to date strings", () => {
        const usageInfo: UsageInfo = {
            firstUsed: new Date("2023-01-01T10:00:00.000Z"),
            lastUsed: new Date("2023-01-02T15:30:00.000Z"),
            useCount: 5
        };

        const result = serializeUsageInfo(usageInfo);

        expect(result.firstUsed).toBe("2023-01-01T10:00:00.000Z");
        expect(result.lastUsed).toBe("2023-01-02T15:30:00.000Z");
        expect(result.useCount).toBe(5);
    });

    it("should preserve additional properties from the input object", () => {
        const usageInfoWithExtra = {
            firstUsed: new Date("2023-01-01T10:00:00.000Z"),
            lastUsed: new Date("2023-01-02T15:30:00.000Z"),
            useCount: 3,
            extraProperty: "test",
            anotherProp: 42
        };

        const result = serializeUsageInfo(usageInfoWithExtra);

        expect(result.firstUsed).toBe("2023-01-01T10:00:00.000Z");
        expect(result.lastUsed).toBe("2023-01-02T15:30:00.000Z");
        expect(result.useCount).toBe(3);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle dates with different timezones correctly", () => {
        const usageInfo: UsageInfo = {
            firstUsed: new Date("2023-01-01T10:00:00+02:00"),
            lastUsed: new Date("2023-01-02T15:30:00-05:00"),
            useCount: 2
        };

        const result = serializeUsageInfo(usageInfo);

        // Dates should be serialized to ISO strings in UTC
        expect(result.firstUsed).toBe(new Date("2023-01-01T10:00:00+02:00").toJSON());
        expect(result.lastUsed).toBe(new Date("2023-01-02T15:30:00-05:00").toJSON());
    });

    it("should handle zero use count", () => {
        const usageInfo: UsageInfo = {
            firstUsed: new Date("2023-01-01T10:00:00.000Z"),
            lastUsed: new Date("2023-01-01T10:00:00.000Z"),
            useCount: 0
        };

        const result = serializeUsageInfo(usageInfo);

        expect(result.useCount).toBe(0);
        expect(result.firstUsed).toBe(result.lastUsed);
    });

    it("should handle same first and last used dates", () => {
        const sameDate = new Date("2023-01-01T10:00:00.000Z");
        const usageInfo: UsageInfo = {
            firstUsed: sameDate,
            lastUsed: sameDate,
            useCount: 1
        };

        const result = serializeUsageInfo(usageInfo);

        expect(result.firstUsed).toBe(result.lastUsed);
        expect(result.firstUsed).toBe("2023-01-01T10:00:00.000Z");
    });

    it("should roundtrip correctly with parseUsageInfo", () => {
        const originalUsageInfo: UsageInfo = {
            firstUsed: new Date("2023-01-01T10:00:00.000Z"),
            lastUsed: new Date("2023-01-02T15:30:00.000Z"),
            useCount: 5
        };

        const serialized = serializeUsageInfo(originalUsageInfo);

        // Verify serialized format
        expect(typeof serialized.firstUsed).toBe("string");
        expect(typeof serialized.lastUsed).toBe("string");

        // Import parseUsageInfo to test roundtrip
        const { parseUsageInfo } = require("../../../src/libraries/helpers/parseUsageInfo");
        const parsed = parseUsageInfo(serialized);

        expect(parsed.firstUsed).toEqual(originalUsageInfo.firstUsed);
        expect(parsed.lastUsed).toEqual(originalUsageInfo.lastUsed);
        expect(parsed.useCount).toBe(originalUsageInfo.useCount);
    });
});
