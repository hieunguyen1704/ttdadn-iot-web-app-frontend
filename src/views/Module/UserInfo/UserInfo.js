import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { config } from "../../../config";
import ErrorAlert from "../../Alert/ErrorAlert";
import "./UserInfo.scss";
const UserInfo = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const userInfoUrl = config.dbURl + config.api.userInfo;
    axios
      .get(userInfoUrl)
      .then((response) => {
        const username = response.data.data[0].username;
        const email = response.data.data[0].email;
        setUserName(username);
        setEmail(email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfoUrl = config.dbURl + config.api.userInfo;
    const sendData = {
      username: username,
      email: email,
    };
    axios
      .put(userInfoUrl, sendData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data !== "Update successful") {
          setMessage(response.data.data);
          setHasError(true);
          setTimeout(() => {
            setHasError(false);
          }, 5000);
        } else {
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        // console.log(error.message);
        setMessage("Some thing went wrong");
        setHasError(true);
        setTimeout(() => {
          setHasError(false);
        }, 5000);
      });
  };
  return (
    <Fragment>
      {hasError && <ErrorAlert message={message} />}
      <div style={{ width: "80vw" }} className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-xs-10 col-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={
                  message === "Username is already taken"
                    ? "form-control border-error"
                    : "form-control"
                }
                id="username"
                value={username}
                onChange={handleUserNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={
                  message === "Email is already taken"
                    ? "form-control border-error"
                    : "form-control"
                }
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Save Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default UserInfo;
