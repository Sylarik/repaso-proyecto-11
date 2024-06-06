import { FunctionComponent } from "preact";
import { Product } from "../types.ts";
import { CarritoItem } from "../types.ts";
import {cartNumber} from "../signals/cartNumber.ts"

export const Add: FunctionComponent<{ producto: Product }> = ({ producto }) => {
  const AddQ = (p: Product) => {
    // read cart cookie
    const cookies = document.cookie.split("; ");
    const cartCookie = cookies.find((cookie) => cookie.startsWith("cart="));
    if (!cartCookie) {
      document.cookie = `cart=${
        JSON.stringify([
          { product:p, quantity: 1 },
        ])
      }; path=/`; // we must set the path to / so the cookie is available in all pages
    } 
    else {
      const cart: CarritoItem[] = JSON.parse(cartCookie.split("=")[1]);
      const found = cart.find((item) => item.product.id === p.id);
      if (found) {
        found.quantity++;
      } else {
        cart.push({ product:p, quantity: 1 });
      }
      document.cookie = `cart=${JSON.stringify(cart)}; path=/`; // we must set the path to / so the cookie is available in all pages
    }
    cartNumber.value++;
  };

  return <span class="add" onClick={(e) => AddQ(producto)}>+</span>;
};
