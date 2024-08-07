import { INITIALLY_DEFERRED } from "sequelize/types/deferrable";

export interface InputCreateProductDto{
    name: string;
    price: number;
}

export interface OutputCreateProductDto{
    id: string;
    name: string;
    price: number;
}