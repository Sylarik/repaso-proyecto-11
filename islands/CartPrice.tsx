import { FunctionComponent } from "preact";
import { Product } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import { CarritoItem } from "../types.ts";
import { cartNumber } from "../signals/cartNumber.ts";
import { Add } from "./Add.tsx";
import { Decrease } from "./Decrease.tsx";

export const CartPrice: FunctionComponent = () => {
  const [cart, setCart] = useState<CarritoItem[]>([]);

  useEffect(() => {
    // load cart from cookie
    const cookies = document.cookie.split("; ");
    console.log(cookies);
    const cartCookie = cookies.find((cookie) => cookie.startsWith("cart="));

    if (cartCookie) {
      setCart(JSON.parse(cartCookie.split("=")[1]));
    }
  }, [cartNumber.value]);

  return (
    <div class="total">
      {
        // fix to to decimals

        cart
          .reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0,
          )
          .toFixed(2)
      }€
    </div>
  );
};
