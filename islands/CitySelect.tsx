import { FunctionComponent } from "preact";
import { Country, Product } from "../types.ts";
import { useEffect, useState } from "preact/hooks";
import { CarritoItem } from "../types.ts";
import { cartNumber } from "../signals/cartNumber.ts";
import { Add } from "./Add.tsx";
import { Decrease } from "./Decrease.tsx";
import { citySignal } from "../signals/citySignal.ts";
import { countrySignal } from "../signals/countrySignal.ts";

export const CitySelect: FunctionComponent = () => {
  const [cities, setCities] = useState<string[]>([]);
  useEffect(() => {
    const fetchCities = async (code: string) => {
      const api = await fetch(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ iso2: code }),
        },
      );
      if (!api.ok) {
        console.error("Failed to fetch cities");
        setCities([]);
      }
      const data = await api.json();
      setCities(data.data);
      citySignal.value = data.data[0];
    };
    if (countrySignal.value !== "") {
      setCities([]);
      fetchCities(countrySignal.value);
    }
  }, [countrySignal.value]);

  if (cities.length > 0) {
    return (
      <>
        <label for="city">City</label>
        <select
          value={citySignal}
          id="city"
          name="city"
          onChange={(e) => (citySignal.value = e.currentTarget.value)}
          required
        >
          {cities.map((city) => {return (
            <option key={city} value={city}>
              {city}
            </option>
          )})}
        </select>
      </>
    );
  } else return null;
};
