import { getModelForClass, prop } from '@typegoose/typegoose'

export class Country {
    @prop({
        type: String,
        required: true,

        index: true,
    })
    public name!: string

    @prop({
        type: String,
        required: true,
    })
    public isoCode!: string
}

export const CountryModel = getModelForClass(Country)
