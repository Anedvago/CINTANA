export interface Article {
    id?: number;
    ref: string;
    name: string;
    value: number;
    stock: number;
    dpto?: number;
    section?: number;
    family?: number;
}