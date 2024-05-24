import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";

export default function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      try {
        const places = await fetchPlaces();
        console.log(places);
        setLoadedPlaces(places);
      } catch (e) {
        console.warn(e);
      }
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
