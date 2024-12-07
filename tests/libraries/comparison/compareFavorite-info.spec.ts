import {compareFavoriteInfo} from "../../../src/libraries/comparison/compareFavoriteInfo";

test(
	"later added is before sooner added",
	() => {
		expect(compareFavoriteInfo(
			{
                added: new Date(1),
                hotkey: false,
            },
            {
                added: new Date(0),
                hotkey: false,
            },
		)).toBe(-1)
	}
)

test(
	"sooner added is after later added",
	() => {
		expect(compareFavoriteInfo(
            {
                added: new Date(0),
                hotkey: false,
            },
			{
                added: new Date(1),
                hotkey: false,
            },
		)).toBe(1)
	}
)
