import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {Products} from "../../components/Products.tsx"
import {Product} from "../../types.ts"

export const handler: Handlers = {
    GET: async(req: Request, ctx:FreshContext) => {
        const {id} = ctx.params //coger cosas del path

        const response = await fetch(`https://shop-products.deno.dev/products/${id}`)

        if(response.status !== 200){
            return ctx.render()
        }

        const data = await response.json()

        return ctx.render(data)
    }
}

export default function Page (props:PageProps<Product[]>) {
    return (
        <>
            <Products productos={props.data}></Products>
        </>
    )
}