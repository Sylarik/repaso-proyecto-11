import { FunctionComponent } from "preact";
import { CartPrice } from "../islands/CartPrice.tsx";
import { Country } from "../types.ts";
import {CountrySelect} from "../islands/CountrySelect.tsx"
import { CitySelect } from "../islands/CitySelect.tsx";

export const Checkout: FunctionComponent<{pais: Country[]}> = ({pais}) => {
  return (
    <div class="checkout">
      <h1>Checkout</h1>
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required />

        <label for="country">Country</label>
        <CountrySelect pais={pais}></CountrySelect>
        <CitySelect />
        
        <label for="payment">Payment method</label>
        <select id="payment" name="payment" required>
          <option value="card">Card</option>
          <option value="cash">Cash</option>
        </select>
        <CartPrice/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
