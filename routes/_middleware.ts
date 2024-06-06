

import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken"

import {Cookie} from "../types.ts"

export const handler = async (req:Request, ctx:FreshContext<Cookie>) => {  //esto siempre

    if (ctx.destination !== "route") { //cualquiera cosa que no sea ruta lo quitamos
        const resp = await ctx.next();
        return resp;
    }
    
    // if login route, pass to next middleware
    //como no tenemos cookies, si puede ir a register y a login solo
    if (ctx.route === "/login") {
        const resp = await ctx.next();
        return resp;
    }
    if (ctx.route === "/register") {
        const resp = await ctx.next();
        return resp;
    }

    const { auth } = getCookies(req.headers);
    
    if (!auth) {
      // redirect to login if no auth cookie
      return new Response("", {
        status: 307,
        headers: { location: "/login" },
      });
    }
  
    const payload = jwt.verify(auth, Deno.env.get("JWT_SECRET"));
  
    if (!payload) {
      // redirect to login if invalid token
      return new Response("", {
        status: 307,
        headers: { location: "/login" },
      });
    }
    //console.log(payload)
    //ctx.state.user = payload.javi;

    ctx.state = payload //tengo todo lo de las cookies

    const resp = await ctx.next(); //siempre
    return resp;

}