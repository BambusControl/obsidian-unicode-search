import { parseUsageInfo } from "src/libraries/helpers/parseUsageInfo";
import { RawUsageInfo, UsageInfo } from "src/libraries/types/savedata/usageInfo";

describe("parseUsageInfo", () => {
    it("should parse raw usage info with date strings to Date objects", () => {
        const rawUsageInfo: RawUsageInfo = {
            firstUsed: "2023-01-01T10:00:00.000Z",
            lastUsed: "2023-01-02T15:30:00.000Z",
            useCount: 5
        };

        const result = parseUsageInfo(rawUsageInfo);

        expect(result.firstUsed).toEqual(new Date("2023-01-01T10:00:00.000Z"));
        expect(result.lastUsed).toEqual(new Date("2023-01-02T15:30:00.000Z"));
        expect(result.useCount).toBe(5);
    });

    it("should preserve additional properties from the input object", () => {
        const rawUsageInfoWithExtra = {
            firstUsed: "2023-01-01T10:00:00.000Z",
            lastUsed: "2023-01-02T15:30:00.000Z",
            useCount: 3,
            extraProperty: "test",
            anotherProp: 42
        };

        const result = parseUsageInfo(rawUsageInfoWithExtra);

        expect(result.firstUsed).toEqual(new Date("2023-01-01T10:00:00.000Z"));
        expect(result.lastUsed).toEqual(new Date("2023-01-02T15:30:00.000Z"));
        expect(result.useCount).toBe(3);
        expect(result.extraProperty).toBe("test");
        expect(result.anotherProp).toBe(42);
    });

    it("should handle ISO date strings without milliseconds", () => {
        const rawUsageInfo: RawUsageInfo = {
            firstUsed: "2023-01-01T10:00:00Z",
            lastUsed: "2023-01-02T15:30:00Z",
            useCount: 1
        };

        const result = parseUsageInfo(rawUsageInfo);

        expect(result.firstUsed).toEqual(new Date("2023-01-01T10:00:00Z"));
        expect(result.lastUsed).toEqual(new Date("2023-01-02T15:30:00Z"));
    });

    it("should handle dates with timezone offsets", () => {
        const rawUsageInfo: RawUsageInfo = {
            firstUsed: "2023-01-01T10:00:00+02:00",
            lastUsed: "2023-01-02T15:30:00-05:00",
            useCount: 2
        };

        const result = parseUsageInfo(rawUsageInfo);

        expect(result.firstUsed).toEqual(new Date("2023-01-01T10:00:00+02:00"));
        expect(result.lastUsed).toEqual(new Date("2023-01-02T15:30:00-05:00"));
    });

    it("should handle zero use count", () => {
        const rawUsageInfo: RawUsageInfo = {
            firstUsed: "2023-01-01T10:00:00.000Z",
            lastUsed: "2023-01-01T10:00:00.000Z",
            useCount: 0
        };

        const result = parseUsageInfo(rawUsageInfo);

        expect(result.useCount).toBe(0);
        expect(result.firstUsed).toEqual(result.lastUsed);
    });

    it("should handle same first and last used dates", () => {
        const sameDate = "2023-01-01T10:00:00.000Z";
        const rawUsageInfo: RawUsageInfo = {
            firstUsed: sameDate,
            lastUsed: sameDate,
            useCount: 1
        };

        const result = parseUsageInfo(rawUsageInfo);

        expect(result.firstUsed).toEqual(result.lastUsed);
        expect(result.firstUsed).toEqual(new Date(sameDate));
    });
});
