import {compareUsageInfo} from "../../../src/libraries/comparison/compareUsageInfo";

test(
	"later use is before sooner use",
	() => {
		expect(compareUsageInfo(
			{
				firstUsed: new Date(0),
				lastUsed: new Date(2),
				useCount: 1,
			},
			{
				firstUsed: new Date(0),
				lastUsed: new Date(1),
				useCount: 1,
			},
            new Date(0),
		)).toBe(-1)
	}
)

test(
	"sooner use is after later use",
	() => {
		expect(compareUsageInfo(
			{
				firstUsed: new Date(0),
				lastUsed: new Date(1),
				useCount: 1,
			},
			{
				firstUsed: new Date(0),
				lastUsed: new Date(2),
				useCount: 1,
			},
            new Date(0),
		)).toBe(1)
	}
)

test(
	"one use is before zero uses",
	() => {
		expect(compareUsageInfo(
			{
				useCount: 1,
				firstUsed: new Date(0),
				lastUsed: new Date(0),
			},
			{
				useCount: 0,
				firstUsed: new Date(0),
				lastUsed: new Date(0),
			},
            new Date(0),
		)).toBe(-1)
	}
)

test(
	"zero uses is after one use",
	() => {
		expect(compareUsageInfo(
			{
				useCount: 0,
				firstUsed: new Date(0),
				lastUsed: new Date(0),
			},
			{
				useCount: 1,
				firstUsed: new Date(0),
				lastUsed: new Date(0),
			},
            new Date(0),
		)).toBe(1)
	}
)
