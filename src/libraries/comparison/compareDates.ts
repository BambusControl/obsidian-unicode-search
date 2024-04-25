import {Order} from "../order/order";

export function compareDates(left: Date, right: Date): Order {
    console.debug(`${left} ? ${right}`)

    if (left == right) {
        return Order.Equal;
    }

    return left < right
        ? Order.Smaller
        : Order.Greater;
}
