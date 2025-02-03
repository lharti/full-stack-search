import { getModelForClass, prop, PropType } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { createSearchIndex } from './statics/createSearchIndex'
import { findHotelsMatching } from './statics/findHotelsMatching'

export class HotelSearchIndex {
    @prop({
        type: String,
        required: true,
    })
    public hotelName!: string

    @prop({
        type: Types.ObjectId,
        required: true,
    })
    public hotelId!: Types.ObjectId

    @prop(
        {
            type: [String],
            required: false,

            index: true,
        },

        PropType.ARRAY,
    )
    public prefixTokens?: string[]

    @prop(
        {
            type: [String],
            required: false,

            index: true,
        },

        PropType.ARRAY,
    )
    public fragmentsTokens?: string[]

    @prop(
        {
            type: [String],
            required: false,

            index: true,
        },

        PropType.ARRAY,
    )
    public semanticTokens: string[] | undefined

    public static createSearchIndex = createSearchIndex
    public static findHotelsMatching = findHotelsMatching
}

export const HotelSearchIndexModel = getModelForClass(HotelSearchIndex)
