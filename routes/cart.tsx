import { FreshContext, Handlers, LayoutConfig } from "$fresh/server.ts";
import {LoginForm} from "../components/LoginForm.tsx"
import jwt from "jsonwebtoken"
import {setCookie} from "$std/http/cookie.ts"
import { Carro } from "../islands/Carro.tsx";



export default function Page () {
    return(
        <>
            <Carro/>
        </>
    )
}

