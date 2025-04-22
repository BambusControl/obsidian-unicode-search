import { compareDates } from "../../../src/libraries/comparison/compareDates";
import { Order } from "../../../src/libraries/order/order";

describe("compareDates", () => {
    it("should return Order.Smaller when the left date is earlier than the right date", () => {
        const left = new Date("2023-01-01");
        const right = new Date("2023-01-02");
        expect(compareDates(left, right)).toBe(Order.Smaller);
    });

    it("should return Order.Greater when the left date is later than the right date", () => {
        const left = new Date("2023-01-02");
        const right = new Date("2023-01-01");
        expect(compareDates(left, right)).toBe(Order.Greater);
    });

    it("should return Order.Equal when the left date is the same as the right date", () => {
        const left = new Date("2023-01-01");
        const right = new Date("2023-01-01");
        expect(compareDates(left, right)).toBe(Order.Equal);
    });
});
