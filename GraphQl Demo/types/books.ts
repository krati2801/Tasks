import { Document } from "mongoose"

export interface Ibook extends Document {
  title: string
  description: string
  author: boolean
}