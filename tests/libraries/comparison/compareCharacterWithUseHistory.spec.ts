import { compareCharacterWithUseHistorys } from "src/libraries/comparison/compareCharacterWithUseHistory";

test("character with `use` is before character without", () => {
	expect(
		compareCharacterWithUseHistorys(
			{
				id: 0x20,
				glyph: " ",
				name: "b",
				category: "Ll",
				lastUse: new Date(2),
				firstUse: new Date(1),
				timesUsed: 1,
			},
			{
				id: 0x20,
				glyph: " ",
				name: "a",
				category: "Ll",
			},
			new Date(0),
		),
	).toBe(-1);
});

test("characters with same `name`, `use`, and `favorite` are equal", () => {
	expect(
		compareCharacterWithUseHistorys(
			{
				id: 0x20,
				glyph: " ",
				name: "name",
				category: "Ll",
				firstUse: new Date(1),
				lastUse: new Date(1),
				timesUsed: 1,
			},
			{
				id: 0x20,
				glyph: " ",
				name: "name",
				category: "Ll",
				firstUse: new Date(1),
				lastUse: new Date(1),
				timesUsed: 1,
			},
			new Date(0),
		),
	).toBe(0);
});
