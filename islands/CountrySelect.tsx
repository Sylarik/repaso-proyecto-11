import { FunctionComponent } from "preact";
import { Country, Product } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import { CarritoItem } from "../types.ts";
import { cartNumber } from "../signals/cartNumber.ts";
import { Add } from "./Add.tsx";
import { Decrease } from "./Decrease.tsx";

import { countrySignal } from "../signals/countrySignal.ts";

export const CountrySelect: FunctionComponent<{ pais: Country[] }> = (
  { pais },
) => {
  return (
    <>
      {pais.length > 0 && (
        <>
          <select
            value={countrySignal.value !== "" ? countrySignal.value : pais[0].code}
            id="country"
            name="country"
            onChange={(e) => (countrySignal.value = e.currentTarget.value)}
            required
          >
            {pais.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
};
