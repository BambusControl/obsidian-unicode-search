import { mostRecentUses } from "src/libraries/helpers/mostRecentUses";
import { UseDate } from "src/libraries/types/savedata/useRecord";

describe("mostRecentUses", () => {
    it("should return empty array when input is empty", () => {
        const result = mostRecentUses([]);
        expect(result).toEqual([]);
    });

    it("should return single date when input has one item", () => {
        const firstUse = new Date("2022-12-31");
        const lastUse = new Date("2023-01-01");
        const items: UseDate[] = [{ firstUse, lastUse }];
        const result = mostRecentUses(items);

        expect(result).toEqual([lastUse]);
    });

    it("should sort dates in descending order (most recent first)", () => {
        const firstUse = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");
        const date3 = new Date("2023-01-03");

        const items: UseDate[] = [
            { firstUse, lastUse: date1 },
            { firstUse, lastUse: date3 },
            { firstUse, lastUse: date2 }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date3, date2, date1]);
    });

    it("should handle items with same dates", () => {
        const firstUse = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");

        const items: UseDate[] = [
            { firstUse, lastUse: date1 },
            { firstUse, lastUse: date2 },
            { firstUse, lastUse: date1 },
            { firstUse, lastUse: date2 }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date2, date2, date1, date1]);
    });

    it("should not modify the original array", () => {
        const firstUse = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");

        const items: UseDate[] = [
            { firstUse, lastUse: date1 },
            { firstUse, lastUse: date2 }
        ];
        const originalOrder = [...items];

        mostRecentUses(items);

        expect(items).toEqual(originalOrder);
    });

    it("should work with complex objects containing additional properties", () => {
        const firstUse = new Date("2022-12-31");
        const date1 = new Date("2023-01-01");
        const date2 = new Date("2023-01-02");
        const date3 = new Date("2023-01-03");

        const items = [
            { firstUse, lastUse: date1, someOtherProp: "a" },
            { firstUse, lastUse: date3, someOtherProp: "b" },
            { firstUse, lastUse: date2, someOtherProp: "c" }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date3, date2, date1]);
    });

    it("should handle dates with different times on the same day", () => {
        const firstUse = new Date("2022-12-31");
        const date1 = new Date("2023-01-01T10:00:00Z");
        const date2 = new Date("2023-01-01T12:00:00Z");
        const date3 = new Date("2023-01-01T08:00:00Z");

        const items: UseDate[] = [
            { firstUse, lastUse: date1 },
            { firstUse, lastUse: date2 },
            { firstUse, lastUse: date3 }
        ];

        const result = mostRecentUses(items);
        expect(result).toEqual([date2, date1, date3]);
    });
});
