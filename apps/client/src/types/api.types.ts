export type Hotel = {
    hotelId: string
    hotelName: string
    matchScore: number
}

export type City = {
    _id: string
    name: string
}

export type Country = {
    _id: string
    name: string
}

export type SearchResult = {
    hotels: Hotel[]
    cities: City[]
    countries: Country[]
}
