import { FreshContext, Handlers, LayoutConfig, PageProps } from "$fresh/server.ts";
import {LoginForm} from "../components/LoginForm.tsx"
import jwt from "jsonwebtoken"
import {setCookie} from "$std/http/cookie.ts"
import { Carro } from "../islands/Carro.tsx";
import { Checkout } from "../components/Checkout.tsx";
import { Country } from "../types.ts";

type CountryResponse = {
    data: { [key: string]: { country: string } };
  };

export const handler: Handlers = {
    GET: async (req:Request, ctx:FreshContext<unknown, Country[]>) => {

        const api = await fetch(`https://api.first.org/data/v1/countries?region=europe`)
        const data:CountryResponse = await api.json()
        const countries: Country[] = Object.entries(data.data).map(
            ([code, { country }]) => ({
              code,
              name: country,
            }),
          );

        return ctx.render(countries)
    }


}

export default function Page (props: PageProps<Country[]>) {
    return(
        <>
            <Checkout pais={props.data}></Checkout>
        </>
    )
}

