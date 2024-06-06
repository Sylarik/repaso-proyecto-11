import { FunctionComponent } from "preact";
import { Product } from "../types.ts";
import {Add} from "../islands/Add.tsx"

export const Products: FunctionComponent<{ productos: Product[] }> = (
  { productos },
) => {
  return (
    <div class="products">
      <h1>Products</h1>
      {productos.map((e) => {
        return (
          <div class="item" data-fresh-key="1">
            <span class="name">{e.name}</span>
            <span class="price">{e.price}€</span>
            <img
              src={e.image}
              alt={e.name}
            />
            <span class="description">{e.description}</span>

            <Add producto={e}></Add>
          </div>
        );
      })}

    </div>
  );
};
