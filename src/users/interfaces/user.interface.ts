import { Document } from "mongoose";
export interface User extends Document{
    name:string;
    readonly email:string;
    password:string;
}