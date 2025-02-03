import { HotelSearchIndex } from '@/models/hotelSearchIndex/hotelSearchIndex.model'
import { ReturnModelType } from '@typegoose/typegoose'

export async function findHotelsMatching(
    this: ReturnModelType<typeof HotelSearchIndex>,
    searchQuery: string,
) {
    const matchStage = {
        $match: {
            $or: [
                { prefixTokens: searchQuery },
                { fragmentsTokens: searchQuery },
                { semanticTokens: searchQuery },
            ],
        },
    }

    const createMatchScoreStage = {
        $addFields: {
            matchScore: {
                $switch: {
                    branches: [
                        {
                            case: { $in: [searchQuery, '$prefixTokens'] },
                            then: 3,
                        },
                        {
                            case: {
                                $in: [searchQuery, '$fragmentsTokens'],
                            },
                            then: 2,
                        },
                        {
                            case: { $in: [searchQuery, '$semanticTokens'] },
                            then: 1,
                        },
                    ],

                    default: 0,
                },
            },
        },
    }

    const sortByMatchScoreStage = {
        $sort: {
            matchScore: -1,
            hotelName: 1,
        },
    } as const

    const projectionStage = {
        $project: {
            _id: 0,
            hotelId: 1,
            hotelName: 1,
            matchScore: 1,
        },
    }

    return await this.aggregate([
        matchStage,
        createMatchScoreStage,
        sortByMatchScoreStage,

        projectionStage,
    ])
}
