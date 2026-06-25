/**
 * Base error type for all errors thrown by code in `src/libraries/`.
 *
 * Use this instead of plain `Error` so that errors from library code are
 * distinguishable from errors thrown by Obsidian, third-party packages, or
 * plugin-layer code (`UnicodeSearchError`).
 *
 * See ADR-0015 for the full custom-error-type policy.
 */
export class LibraryError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "LibraryError";
	}
}
