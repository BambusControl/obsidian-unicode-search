import {request} from "obsidian";
import {UnicodeCharacter} from "../data/unicode.character";
import {parseString} from "@fast-csv/parse";

type Version = "4.1.0"
	| "5.0.0"
	| "5.1.0"
	| "5.2.0"
	| "6.0.0"
	| "6.1.0"
	| "6.2.0"
	| "6.3.0"
	| "7.0.0"
	| "8.0.0"
	| "9.0.0"
	| "10.0.0"
	| "11.0.0"
	| "12.0.0"
	| "12.1.0"
	| "13.0.0"
	| "14.0.0"
	| "15.0.0"
	| "15.1.0"
	| "UCD/latest"

type GeneralCharacterAttribute = "Lu" | "Ll" | "Lt" | "Lm" | "Lo"
	| "Mn" | "Mc" | "Me"
	| "Nd" | "Nl" | "No"
	| "Pc" | "Pd" | "Ps" | "Pe" | "Pi" | "Pf" | "Po"
	| "Sm" | "Sc" | "Sk" | "So"
	| "Zs" | "Zl" | "Zp"
	| "Cc" | "Cf" | "Cs" | "Co" | "Cn";

type UnicodeCharacterDatabaseSourceUri = `https://www.unicode.org/Public/${Version}/ucd/UnicodeData.txt`

const excludedAttributes: string[] = [
	"Cc", "Cn", "Cf", "Co", "Cs",
];

/**
 * https://www.unicode.org/reports/tr44/#Directory_Structure
 *
 * https://www.unicode.org/Public/15.0.0/
 * https://www.unicode.org/Public/UCD/latest/
 */
const dataUri: UnicodeCharacterDatabaseSourceUri = "https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt";

export class UcdService {

	public async doStuff(): Promise<UnicodeCharacter[]> {
		const result = await request(dataUri);
		return await this.promiseMeData(result);
	}

	private promiseMeData(csvString: string): Promise<UnicodeCharacter[]> {
		const arr = new Array<UnicodeCharacter>();

		const stream = parseString(csvString, {
			headers: false,
			delimiter: ";",
		})
			.on("data", (row) => {
				const dd = row as Array<string>;
				const prop = dd[2] == null || excludedAttributes.contains(dd[2]);

				// No 'other' chars
				if (prop) {
					return;
				}

				const prse: UnicodeCharacter = {
					char: String.fromCodePoint(parseInt(dd[0], 16)),
					name: dd[1],
				};

				arr.push(prse);
			});

		return new Promise((resolve, reject) => {
			stream.on("error", (error) => reject(error))
				.on("end", () => resolve(arr));
		});
	}

}
