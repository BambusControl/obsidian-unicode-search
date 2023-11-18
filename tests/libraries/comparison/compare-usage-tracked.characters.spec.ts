import {compareUsageTrackedCharacters} from "../../../src/libraries/comparison/compare-usage-tracked.characters";

test(
	"later use is before sooner use",
	() => {
		expect(compareUsageTrackedCharacters(
			{
				lastUsed: 1,
				useCount: 1,
			},
			{
				lastUsed: 0,
				useCount: 1,
			}
		)).toBe(-1)
	}
)

test(
	"one use is before zero uses",
	() => {
		expect(compareUsageTrackedCharacters(
			{
				useCount: 1,
			},
			{
				useCount: 0,
			}
		)).toBe(-1)
	}
)
