import {compareUsageInfo} from "../../../src/libraries/comparison/compareUsageInfo";

test(
	"later use is before sooner use",
	() => {
		expect(compareUsageInfo(
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
		expect(compareUsageInfo(
			{
				useCount: 1,
                lastUsed: 0,
			},
			{
				useCount: 0,
                lastUsed: 0,
			}
		)).toBe(-1)
	}
)
