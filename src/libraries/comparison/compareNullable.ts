import {Order} from "../order/order";

export function compareNullable<T>(
	left: T | null | undefined,
	right: T | null | undefined,
	compareFn: (a: T, b: T) => Order,
): Order {
	if (left == null && right == null) {
		return Order.Equal;
	}

	if (left != null && right != null) {
		return compareFn(left, right);
	}

	return left == null
		? Order.After
		: Order.Before;
}
