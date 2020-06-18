const configDotEnv = require("dotenv").config;
const env = process.env.NODE_ENV || "development";
if (env === "production") {
  configDotEnv({ path: ".env.production" });
}
export const config = {
  dbURl: process.env.HOST_BACKEND,
  api: {
    data: "/data/get-current-record",
    dataWithTime: "/data/time/",
    getConfig: "/user-config/",
    deleteConfig: "/user-config/delete/",
    register: "/user",
    authoterize: "/auth",
    switch: "/auth/configAuto",
    motorState: "/motor",
    publish: "/publish/",
  },
};
