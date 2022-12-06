import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getMetadata,getDownloadURL,listAll  } from "firebase/storage";

const api = axios.create({ baseURL: 'https://api.example.com' })
const firebaseConfig = {
  apiKey: "AIzaSyDbjhOcP2TgjTn1Me9NxaGLJYjF8i8ktZE",
  authDomain: "fire-tut-981d2.firebaseapp.com",
  databaseURL: "https://fire-tut-981d2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fire-tut-981d2",
  storageBucket: "fire-tut-981d2.appspot.com",
  messagingSenderId: "935943220581",
  appId: "1:935943220581:web:e551613f36c35b1c41058c",
  measurementId: "G-TH1TFB65DG"
};
initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$getStorage = getStorage
  app.config.globalProperties.$ref1 = ref
  app.config.globalProperties.$uploadBytes = uploadBytes
  app.config.globalProperties.$getMetadata = getMetadata
  app.config.globalProperties.$listAll1  = listAll



  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
