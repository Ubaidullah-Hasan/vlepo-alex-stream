import { Document } from "mongoose";

export interface ICategory extends Document{
    categoryName: string;
    image: string;
}