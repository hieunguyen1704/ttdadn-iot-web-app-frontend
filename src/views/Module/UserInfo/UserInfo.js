import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { config } from "../../../config";
import ErrorAlert from "../../Alert/ErrorAlert";
import { storage } from "../../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./UserInfo.scss";
const UserInfo = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userInfoUrl = config.dbURl + config.api.userInfo;
    let mounted = true;
    axios
      .get(userInfoUrl)
      .then((response) => {
        if (mounted) {
          const username = response.data.data[0].username;
          const email = response.data.data[0].email;
          setUserName(username);
          setEmail(email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, []);
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAvatarChange = (event) => {
    if (event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };
  const handleUpload = (event) => {
    event.preventDefault();
    setLoading(true);
    const uploadTask = storage.ref(`avatars/${avatar.name}`).put(avatar);
    uploadTask.on(
      "state_changed",
      // eslint-disable-next-line no-unused-vars
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        if (progress == 100) {
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("avatars")
          .child(avatar.name)
          .getDownloadURL()
          .then((url) => {
            setAvatarUrl(url);
          });
      }
    );
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
            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <br />
              <div className="d-flex justify-content-between">
                <input type="file" id="avatar" onChange={handleAvatarChange} />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
              {loading && (
                <div className="d-flex justify-content-center">
                  <CircularProgress variant="static" value={progress} />
                </div>
              )}
              {avatarUrl && (
                <div className="d-flex justify-content-center mt-3">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    id="avatar-preview"
                    style={{ width: 300, height: 300 }}
                  />
                </div>
              )}
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
