export function asHexadecimal(n: number): string {
    return n.toString(16).padStart(4, "0");
}
