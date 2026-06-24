import {compareUseRecord} from "src/libraries/comparison/compareUseRecord";

test(
	"later use is before sooner use",
	() => {
		expect(compareUseRecord(
			{
				firstUse: new Date(0),
				lastUse: new Date(2),
				timesUsed: 1,
			},
			{
				firstUse: new Date(0),
				lastUse: new Date(1),
				timesUsed: 1,
			},
            new Date(0),
		)).toBe(-1)
	}
)

test(
	"sooner use is after later use",
	() => {
		expect(compareUseRecord(
			{
				firstUse: new Date(0),
				lastUse: new Date(1),
				timesUsed: 1,
			},
			{
				firstUse: new Date(0),
				lastUse: new Date(2),
				timesUsed: 1,
			},
            new Date(0),
		)).toBe(1)
	}
)

test(
	"one use is before zero uses",
	() => {
		expect(compareUseRecord(
			{
				timesUsed: 1,
				firstUse: new Date(0),
				lastUse: new Date(0),
			},
			{
				timesUsed: 0,
				firstUse: new Date(0),
				lastUse: new Date(0),
			},
            new Date(0),
		)).toBe(-1)
	}
)

test(
	"zero uses is after one use",
	() => {
		expect(compareUseRecord(
			{
				timesUsed: 0,
				firstUse: new Date(0),
				lastUse: new Date(0),
			},
			{
				timesUsed: 1,
				firstUse: new Date(0),
				lastUse: new Date(0),
			},
            new Date(0),
		)).toBe(1)
	}
)
