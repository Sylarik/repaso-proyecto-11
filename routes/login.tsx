import { FreshContext, Handlers, LayoutConfig } from "$fresh/server.ts";
import {LoginForm} from "../components/LoginForm.tsx"
import jwt from "jsonwebtoken"
import {setCookie} from "$std/http/cookie.ts"

export const config: LayoutConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
  };

export const handler:Handlers = {
    POST: async (req: Request, ctx: FreshContext) => {
        const url = new URL(req.url)
        const form = await req.formData()
        const email = form.get("email")?.toString()
        const password = form.get("password")?.toString()

        const api = await fetch(`${Deno.env.get("API_URL")}/checkuser`, {
            method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
        })

        if (api.status !== 200){
            return ctx.render() 
        }

        

        const JWT_SECRET = Deno.env.get("JWT_SECRET");
        if(!JWT_SECRET) {
            throw new Error("No se ha encontrado JWT_SECRET")
        }

        const data = await api.json()

        const token = jwt.sign({email, name: data.name, id: data.id}, JWT_SECRET, {
            expiresIn : "24h",
        });

        const headers = new Headers();
        setCookie(headers,{
            name : "auth",
            value : token,
            sameSite : "Lax",
            domain: url.hostname,
            path: "/",
            secure: true
        })

        headers.set("location", "/products/breakfast");
        return new Response (null, {
            status: 303,
            headers,
        });

        
    }
}



export default function Page () {
    return(
        <>
            <LoginForm></LoginForm>
        </>
    )
}

