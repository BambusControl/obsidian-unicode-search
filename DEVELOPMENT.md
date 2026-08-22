# Unicode Search: Development

These are my notes on the development of the plugin.

## Release: How To

The version numbering scheme uses `CURRENT-NEXT` format (e.g., if releasing 0.7.3, the next development version is `0.7.3-NEXT`, not `0.7.4-NEXT`). This allows flexibility to decide whether the next release will be patch, minor, or major.

1. From the `develop` branch, create a release branch `release/X.Y.Z`
2. Go to [package.json](./package.json) and overwrite `X.Y.Z-NEXT` with new release version `X.Y.Z` throughout the whole project (double check if save data version needs to be updated)
3. Update the [package-lock](./package-lock.json) file: `npm install`
4. Export save data schema: `npm run export-schema`
5. Run tests: `npm run test`
6. Run build and test out the app: `npm run build`
7. Commit as "Version `X.Y.Z`"
8. Push, and fix if build fails, otherwise merge to the `main` branch
9. Create a tag with the label `X.Y.Z`
10. GitHub Actions will create a [release](https://github.com/BambusControl/obsidian-unicode-search/releases)
11. Add release notes to the release
12. Fast-forward the `develop` branch
13. Go to [package.json](./package.json) and overwrite `X.Y.Z` with `X.Y.Z-NEXT` (same version + `-NEXT` suffix) throughout the whole project
14. Update the [package-lock](./package-lock.json) file: `npm install`
15. Commit as "Set version as `X.Y.Z-NEXT`" to the `develop` branch

## Features to Add

- [ ] use IndexedDB
  - Since the UCD is large, using JSON to filter add and manipulate characters is slow.
  - IndexedDB should work anywhere, and there is even a library specifically for obsidian---see [Fevol/obsidian-database-library](https://github.com/Fevol/obsidian-database-library).
  - It would greatly help with management of what groups and blocks are enabled, or even provide all characters out of the box.
- [ ] missing characters search
  - It is challenging for users to enable the specific character group and block required for their missing characters.
  - They usually use third party websites, but even then it is difficult to find what they need in the settings (too many options).
  - We could add a search functionality which automatically enables the necessary groups and blocks.
  - We'd need to keep a second copy of the UCD, however, it would keep the editing speed good.
- [ ] user created character names
  - The UCD is provided by Unicode, however their names are not always very helpful.
  - I want to ask users to create their own names, and from it create a new index for easier search.
  - The index would serve as a secondary list of "keywords" used during search.
  - The data can be used to create a dedicated website with an API for other developers.

## Development Diary

### 27. September 2025

Unicode characters can be defined by multiple parts, which makes the string length in JavaScript larger than 1.
I thought the "NFC" normalization limited the string to a length of 2, but that is not the case.
The character [`U+FB2C`](https://www.compart.com/en/unicode/U+FB2C)  has a length of 3.
The "NFC" normalization is still applied, but I don't believe it will guarantee any maximum length of the string.
Fixed in part thanks to https://dietcode.io/p/unicode-normalization/.

### 22. April 2025

The save data rework is kind-of done.
Still, there is overlap between fetching and initializing data which I want to look at later.

### 23. December 2024

Before releasing the new feature, I have to fix the user save data implementation.
Now it deletes their data when a new version of the plugin is loaded.
So, it would forget the favorite characters after an update.

### 19. December 2024

This small plugin became a bit too elaborately written.
I added the "_favorite characters_," and I'm almost done with it.
It works alright, but adding new settings is tedious, so I'm thinking of adding Svelte as the next step (to make the UI modifications easier.)

Also, I want to simplify the code after, because I believe the codebase exploded for no good reason.
