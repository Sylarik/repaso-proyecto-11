import { FunctionComponent } from "preact";
import { Product } from "../types.ts";
import { NumCarrito } from "../islands/NumCarrito.tsx";

export const Menu: FunctionComponent = (
  
) => {
  return (
    <div class="menu">
      <a href="/products/breakfast" data-current="true" aria-current="page">
        Breakfasts
      </a>
      <a href="/products/lunch">Luncheons</a>
      <a href="/cart">
        Shopping cart <div><NumCarrito></NumCarrito></div>
      </a>
      
    </div>
  );
};
