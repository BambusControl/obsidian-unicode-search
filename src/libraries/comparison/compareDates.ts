import {Order} from "../order/order";

export function compareDates(left: Date, right: Date): Order {
    if (left === right) {
        return Order.Equal;
    }

    return left < right
        ? Order.Smaller
        : Order.Greater;
}
