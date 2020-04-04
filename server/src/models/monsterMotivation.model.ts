import { Schema, Document, model, Model } from 'mongoose'

export interface MonsterMotivation extends Document {
    /** A good name to tell it apart */
    name: string
    /** Some words to describe the goals for this motivation */
    description: string
    /** A number to determine the weight for it to be randomly chosen. Higher chosen more often. */
    rarity: number
    /** The date this document was created. Created by Mongoose */
    createdAt: Date
    /** The date this document last updated. Created by Mongoose */
    updatedAt: Date
    /** The version number for this document. Created by Mongoose */
    __v: number
}

const monsterMotivationSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true },
        rarity: { type: Number, default: 10 },
    },
    {
        timestamps: true,
    },
)

export default (): Model<MonsterMotivation> => model<MonsterMotivation>('MonsterMotivation', monsterMotivationSchema)
