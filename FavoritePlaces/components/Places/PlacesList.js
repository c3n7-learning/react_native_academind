import { FlatList } from "react-native";

export default function PlacesList({ places }) {
  return <FlatList data={places} key={(item) => item.id} renderItem={<></>} />;
}
