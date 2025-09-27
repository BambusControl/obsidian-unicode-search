import { mostRecentUses } from "src/libraries/helpers/mostRecentUses";
import { UsageDate } from "src/libraries/types/savedata/usageInfo";

describe("mostRecentUses", () => {
    it("should return empty array when input is empty", () => {
        const result = mostRecentUses([]);
        expect(result).toEqual([]);
    });

    it("should return single date when input has one item", () => {
        const firstUsed = new Date("2022-12-31");
        const lastUsed = new Date("2023-01-01");
        const items: UsageDate[] = [{ firstUsed, lastUsed }];
        const result = mostRecentUses(items);

        expect(result).toEqual([lastUsed]);
    });

    it("should sort dates in descending order (most recent first)", () => {
        const firstUsed = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");
        const date3 = new Date("2023-01-03");

        const items: UsageDate[] = [
            { firstUsed, lastUsed: date1 },
            { firstUsed, lastUsed: date3 },
            { firstUsed, lastUsed: date2 }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date3, date2, date1]);
    });

    it("should handle items with same dates", () => {
        const firstUsed = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");

        const items: UsageDate[] = [
            { firstUsed, lastUsed: date1 },
            { firstUsed, lastUsed: date2 },
            { firstUsed, lastUsed: date1 },
            { firstUsed, lastUsed: date2 }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date2, date2, date1, date1]);
    });

    it("should not modify the original array", () => {
        const firstUsed = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");

        const items: UsageDate[] = [
            { firstUsed, lastUsed: date1 },
            { firstUsed, lastUsed: date2 }
        ];
        const originalOrder = [...items];

        mostRecentUses(items);

        expect(items).toEqual(originalOrder);
    });

    it("should work with complex objects containing additional properties", () => {
        const firstUsed = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");
        const date3 = new Date("2023-01-03");

        const items = [
            { firstUsed, lastUsed: date1, someOtherProp: "a" },
            { firstUsed, lastUsed: date3, someOtherProp: "b" },
            { firstUsed, lastUsed: date2, someOtherProp: "c" }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date3, date2, date1]);
    });

    it("should handle dates with different times on the same day", () => {
        const firstUsed = new Date("2022-12-31");
        const date1 = new Date("2023-01-01T10:00:00Z");
        const date2 = new Date("2023-01-01T12:00:00Z");
        const date3 = new Date("2023-01-01T08:00:00Z");

        const items: UsageDate[] = [
            { firstUsed, lastUsed: date1 },
            { firstUsed, lastUsed: date2 },
            { firstUsed, lastUsed: date3 }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date2, date1, date3]);
    });
});
