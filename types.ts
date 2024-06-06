export type Cookie = {
    name: string,
    email: string,
    id: string
}

export type Product = {
    name: string,
    price: number,
    description: string,
    image: string
    id: number
}

export type CarritoItem = {
    product: Product,
    quantity: number
}

export type Country = {
    code: string,
    name: string
}