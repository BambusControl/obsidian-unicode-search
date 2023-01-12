export function convertToUnicode(hexCode: string): string {
	return String.fromCodePoint(
		Number(`0x${hexCode}`),
	);
}
