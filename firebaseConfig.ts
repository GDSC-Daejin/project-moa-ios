import { initializeApp } from "firebase/app";
import { API_KEY, APP_ID, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET } from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  appId: APP_ID,
};

export const app = initializeApp(firebaseConfig);
