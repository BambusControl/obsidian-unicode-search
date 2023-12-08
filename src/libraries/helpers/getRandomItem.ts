export function getRandomItem<T>(chars: T[]): T {
    return chars[Math.floor(Math.random() * chars.length)];
}
