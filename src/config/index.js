const configDotEnv = require("dotenv").config;
const env = process.env.NODE_ENV || "development";
if (env === "product") {
  configDotEnv({ path: ".env.product" });
}
export const config = {
  dbURl: process.env.HOST_BACKEND,
  // firebaseConfig: {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: "bookstore-huydnguyen-react.firebaseapp.com",
  //   databaseURL: "https://bookstore-huydnguyen-react.firebaseio.com",
  //   projectId: "bookstore-huydnguyen-react",
  //   storageBucket: "bookstore-huydnguyen-react.appspot.com",
  //   messagingSenderId: "839995242070",
  //   appId: "1:839995242070:web:76622821ae2cb29e2d2df7",
  //   measurementId: "G-DVN9BCDF96"
  // },
  api: {
    data: "/data/get-current-record",
    dataWithTime: "/data/time/",
    getConfig: "/user-config/",
    deleteConfig: "/user-config/delete/",
    register: "/user",
    authoterize: "/auth"
  },
};
