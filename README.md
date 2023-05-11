# Obsidian Unicode Search

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?label=downloads&query=%24%5B%22unicode-search%22%5D%5B%22downloads%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json&logo=obsidian&color=8b6cef&logoColor=8b6cef&labelColor=f1f2f3&logoWidth=20&style=for-the-badge)

Easily search the [Unicode Character Database](https://www.unicode.org/ucd/) index
and insert any character into your editor.

> *This is a plugin for [Obsidian](https://obsidian.md); [unicode-search](https://obsidian.md/plugins?id=unicode-search)*.

## Usage

The plugin adds a command for searching unicode characters.

![Search command preview](./assets/command.png)

Just describe the character you're searching for
and press <kbd>↵</kbd> to insert it into the editor.

![Search "wave" preview](./assets/search-wave.png)

The character is inserted into the editor.

![Inserted wave symbol](./assets/wave-inserted.png)

## Development

Docker compose is provided for easier environment set-up.

Install dependencies.

```console
docker-compose run --rm npm install
```

Build the project.

```console
docker-compose run --rm npm run build
```
