import { getRandomItem } from "src/libraries/helpers/getRandomItem";
import { LibraryError } from "src/libraries/errors/libraryError";

describe("getRandomItem", () => {
	it("should throw LibraryError when array is empty", () => {
		expect(() => getRandomItem([])).toThrow(LibraryError);
		expect(() => getRandomItem([])).toThrow(
			"Cannot get a random item from an empty array",
		);
	});

	it("should return the only item when array has one element", () => {
		const items = ["single"];
		const result = getRandomItem(items);
		expect(result).toBe("single");
	});

	it("should return one of the items when array has multiple elements", () => {
		const items = ["a", "b", "c", "d", "e"];
		const result = getRandomItem(items);
		expect(items).toContain(result);
	});

	it("should work with different types", () => {
		const numbers = [1, 2, 3, 4, 5];
		const result = getRandomItem(numbers);
		expect(numbers).toContain(result);
		expect(typeof result).toBe("number");
	});

	it("should work with objects", () => {
		const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
		const result = getRandomItem(objects);
		expect(objects).toContain(result);
		expect(result).toHaveProperty("id");
	});

	it("should distribute across all items over multiple calls", () => {
		const items = ["a", "b"];
		const results = new Set<string>();

		// Run enough times to statistically hit both items
		for (let i = 0; i < 100; i++) {
			results.add(getRandomItem(items));
		}

		// Should have hit both items at some point
		expect(results.size).toBeGreaterThan(1);
		expect(results.has("a")).toBe(true);
		expect(results.has("b")).toBe(true);
	});
});
