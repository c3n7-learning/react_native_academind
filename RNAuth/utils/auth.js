import axios from "axios";
import { FirebaseConfig } from "./firebase.config";

const API_KEY = FirebaseConfig.WebAPIKey;

async function createUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
}
