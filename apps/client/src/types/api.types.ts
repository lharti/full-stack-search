export type HotelSearchResult = {
    hotelId: string
    hotelName: string
    matchScore: number
}

export type SearchResult = {
    hotels: HotelSearchResult[]
    cities: City[]
    countries: Country[]
}

export type City = {
    _id: string
    name: string
}

export type Country = {
    _id: string
    name: string
    isoCode: string
}

export type Hotel = {
    _id: string
    hotelName: string
    addressLine1: string
    addressLine2?: string
    city: string

    chainName: string
    country: string
    countryIsoCode: string
    starRating: number
    state?: string
    zipCode: string
}
