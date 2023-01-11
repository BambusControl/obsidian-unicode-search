export interface SearchResponseDto {

	result?: {

		/**
		 * Total results
		 */
		t: number

		/**
		 * Unicode characters
		 */
		c: Array<Array<string | null>>

		/**
		 * Unicode blocks
		 */
		b: Array<Array<string | null>>

		/**
		 * Unicode sets
		 */
		s: Array<Array<string | null>>

		/**
		 * Alphabets
		 */
		a: Array<Array<string | null>>
	};

	error?: {
		code: number,
		info: string | null,
	};

}
