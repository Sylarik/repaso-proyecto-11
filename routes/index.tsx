import { Handlers } from "$fresh/server.ts";

//redireccionar a una pagina
export const handler: Handlers = {
    GET: () => {
      const headers = new Headers({location: "/login"})
      return new Response("",{
        headers,
        status:302})
    }
}

