import { getModelForClass, prop } from '@typegoose/typegoose'

export class City {
    @prop({
        type: String,
        required: true,

        index: true,
    })
    public name!: string
}

export const CityModel = getModelForClass(City)
