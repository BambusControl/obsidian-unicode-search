# Obsidian Unicode Search

Easily search the [Unicode Character Database](https://www.unicode.org/ucd/) index
and insert any character into your editor.

> This is a plugin for [Obsidian](https://obsidian.md)

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
