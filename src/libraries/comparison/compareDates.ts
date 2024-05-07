import {Order} from "../order/order";

export function compareDates(left: Date, right: Date): Order {
    if (left < right) {
        return Order.Smaller;
    }

    if (left > right) {
        return Order.Greater;
    }

    return Order.Equal;
}
