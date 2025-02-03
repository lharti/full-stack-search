import { hotelsSemanticTokens } from '@/data/hotelsSemanticTokens'
import { Hotel } from '@/models/hotel'
import { HotelSearchIndex } from '@/models/hotelSearchIndex'
import { ReturnModelType } from '@typegoose/typegoose'
import { trigram } from 'n-gram'

export async function createSearchIndex(
    this: ReturnModelType<typeof HotelSearchIndex>,
    hotel: Hotel,
) {
    const { prefixTokens, fragmentsTokens, semanticTokens } =
        createSearchTokens(hotel.hotelName, hotel.country, hotel.city)

    return this.create({
        hotelId: hotel._id,
        hotelName: hotel.hotelName,

        prefixTokens,
        fragmentsTokens,
        semanticTokens,
    })
}

// Internal helpers start
const createSearchTokens = (
    hotelName: string,
    country: string,
    city: string,
): {
    prefixTokens: string[]
    fragmentsTokens: string[]
    semanticTokens: string[]
} => {
    const text = hotelName.trim().replace(/\s+/g, ' ').toLowerCase()

    const prefixTokens = createPrefixTokens(text)

    const fragmentsTokens = createFragmentsTokens(text)

    const semanticTokens = createSemanticTokens(hotelName, [
        country.toLowerCase(),
        city.toLowerCase(),
    ])

    return {
        prefixTokens,
        fragmentsTokens,
        semanticTokens,
    }
}

const createPrefixTokens = (text: string): string[] => {
    const characters = text.split('')

    return characters.map((_, index) => text.slice(0, ++index))
}

const createFragmentsTokens = (text: string): string[] => {
    const words = text.split(' ')

    return words
        .map(word => trigram(word))
        .flat()
        .concat(words)
}

const createSemanticTokens = (
    hotelName: string,
    initialTokens: string[],
): string[] => {
    const preComputedTokens =
        hotelsSemanticTokens.find(hotel => hotel.hotelName === hotelName)
            ?.tokens || []

    return Array.from(new Set([...initialTokens, ...preComputedTokens]))
}
// Internal helpers end
