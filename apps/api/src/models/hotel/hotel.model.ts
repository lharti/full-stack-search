import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongoose'

export class Hotel {
    public _id!: ObjectId

    @prop({
        type: String,
        required: true,

        index: true,
    })
    public hotelName!: string

    @prop({
        type: String,
    })
    public chainName!: string

    @prop({
        type: String,
        required: true,
    })
    public addressLine1!: string

    @prop({
        type: String,
    })
    public addressLine2?: string

    @prop({
        type: String,
    })
    public zipCode!: string

    @prop({
        type: String,
        required: true,

        index: true,
    })
    public city!: string

    @prop({
        type: String,

        index: true,
    })
    public state!: string

    @prop({
        type: String,
        required: true,

        index: true,
    })
    public country!: string

    @prop({
        type: String,
        required: true,
        uppercase: true,
        minlength: 2,
        maxlength: 3,
    })
    public countryIsoCode!: string

    @prop({
        type: Number,
        required: true,
        min: 1,
        max: 5,
    })
    public starRating!: number
}

export const HotelModel = getModelForClass(Hotel)
