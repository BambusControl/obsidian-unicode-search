export enum Order {

	/**
	 * **First** argument is **smaller than** the **second** argument.
	 */
	Before = -1,
	Smaller = Before,

	/**
	 * **First** argument is **equal to** the **second** argument.
	 */
	Equal = 0,

	/**
	 * **First** argument is **greater than** the **second** argument.
	 */
	After = 1,
	Greater = After,
}
