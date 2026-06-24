import { averageUseCount } from "src/libraries/helpers/averageUseCount";

describe("averageUseCount", () => {
    it("should return 0 when the input array is empty", () => {
        const result = averageUseCount([]);
        expect(result).toBe(0);
    });

    it("should return the correct average when the input array has one item", () => {
        const result = averageUseCount([{ timesUsed: 5 }]);
        expect(result).toBe(5);
    });

    it("should return the correct average when the input array has multiple items", () => {
        const result = averageUseCount([{ timesUsed: 5 }, { timesUsed: 10 }, { timesUsed: 15 }]);
        expect(result).toBe(10);
    });

    it("should handle an array with all zero timesUseds", () => {
        const result = averageUseCount([{ timesUsed: 0 }, { timesUsed: 0 }, { timesUsed: 0 }]);
        expect(result).toBe(0);
    });

    it("should handle an array with mixed positive and zero timesUseds", () => {
        const result = averageUseCount([{ timesUsed: 0 }, { timesUsed: 10 }, { timesUsed: 20 }]);
        expect(result).toBe(10);
    });
});
