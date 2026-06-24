import { compareFavorite } from "src/libraries/comparison/compareFavorite";

test("later added is before sooner added", () => {
	expect(
		compareFavorite(
			{
				added: new Date(1),
				quickInsertEnabled: false,
			},
			{
				added: new Date(0),
				quickInsertEnabled: false,
			},
		),
	).toBe(-1);
});

test("sooner added is after later added", () => {
	expect(
		compareFavorite(
			{
				added: new Date(0),
				quickInsertEnabled: false,
			},
			{
				added: new Date(1),
				quickInsertEnabled: false,
			},
		),
	).toBe(1);
});
