import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    try {
      await insertPlace(place);
      navigation.navigate("AllPlaces");
    } catch (e) {
      console.log("Error", e);
    }
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
