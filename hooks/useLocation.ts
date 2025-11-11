import { useEffect, useState } from "react";
import { loadLocation, saveLocation } from "../storage/locationStorage";

export function useLocation() {
  const [city, setCity] = useState<string>("Toronto");

  useEffect(() => {
    (async () => {
      const stored = await loadLocation();
      setCity(stored);
    })();
  }, []);

  const updateCity = async (newCity: string) => {
    setCity(newCity);
    await saveLocation(newCity);
  };

  return { city, updateCity };
}