export function trigram(value: string) {
    const nGrams: string[] = []

    if (value === null || value === undefined) {
        return nGrams
    }

    const source = typeof value.slice === 'function' ? value : String(value)
    let index = source.length - 3 + 1

    if (index < 1) {
        return nGrams
    }

    while (index--) {
        nGrams[index] = source.slice(index, index + 3)
    }

    return nGrams
}
