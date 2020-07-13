import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { config } from "../../../../config";
import axios from "axios";
const ButtonNotification = () => {
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    const userInfoUrl = config.dbURl + config.api.userInfo;
    axios
      .get(userInfoUrl)
      .then((response) => {
        setNotification(response.data.data[0].isNotification);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleNotificationChange = () => {
    const toggleNotificationUrl = config.dbURl + config.api.toggleNotification;
    axios
      .get(toggleNotificationUrl)
      .then((response) => {
        setNotification(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Button
      style={{ marginTop: 10, marginBottom: 10 }}
      variant="contained"
      color={notification ? "secondary" : "primary"}
      onClick={handleNotificationChange}
    >
      {notification
        ? "Turn off email notification"
        : "Turn on email notification"}
    </Button>
  );
};
export default ButtonNotification;
