import { FunctionComponent } from "preact";
import { Product } from "../types.ts";
import { CarritoItem } from "../types.ts";
import {cartNumber} from "../signals/cartNumber.ts"

export const Decrease: FunctionComponent<{ producto: Product }> = ({ producto }) => {
  const DecreaseQ = (p: Product) => {
    // read cart cookie
    const cookies = document.cookie.split("; ");
    const cartCookie = cookies.find((cookie) => cookie.startsWith("cart="));
    if (!cartCookie) {
      return;
    } 
    else {
      const cart: CarritoItem[] = JSON.parse(cartCookie.split("=")[1]);
      const found = cart.find((item) => item.product.id === p.id);
      if (found) {
        found.quantity--;
        if (found.quantity === 0) {
            cart.splice(cart.indexOf(found), 1); //splice -> borrar
        }
      }
      document.cookie = `cart=${JSON.stringify(cart)}; path=/`; // we must set the path to / so the cookie is available in all pages
    }
    cartNumber.value--;
  };

  return <span class="add" onClick={(e) => DecreaseQ(producto)}>-</span>;
};
