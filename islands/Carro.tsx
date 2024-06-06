import { FunctionComponent } from "preact";
import { Product } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import { CarritoItem } from "../types.ts";
import { cartNumber } from "../signals/cartNumber.ts";
import { Add } from "./Add.tsx";
import { Decrease } from "./Decrease.tsx";

export const Carro: FunctionComponent = () => {
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
    <div class="products">
      <h1>Cart</h1>

      {cart.map((e) => {
        return (
          <div class="item">
            <span class="name">{e.product.name}</span>
            <span class="price">{e.product.price}€</span>
            <img
              src={e.product.image}
              alt={e.product.name}
            />
            <span class="description">{e.product.description}</span>
            <Decrease producto={e.product}></Decrease>
            <span class="quantity">{e.quantity}</span>
            <Add producto={e.product}></Add>
          </div>
        );
      })}

      <div class="total">
        <div class="total-text">Total:</div>
        <div class="total-price">
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
      </div>
      <button
        class="checkout-button"
        onClick={() => {
          // got to /checkout page
            window.location.href = "/checkout";
        }}
      >
        Checkout
      </button>
    </div>
  );
};
