import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { config } from "../../../config";
import ErrorAlert from "../../Alert/ErrorAlert";
import { storage } from "../../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "../UserConfig/Loading/Loading";
import "./UserInfo.scss";
import { useSelector } from "react-redux";
const UserInfo = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [invalidImage, setInvalidImage] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const userInfoUrl = config.dbURl + config.api.userInfo;
    let mounted = true;
    axios
      .get(userInfoUrl)
      .then((response) => {
        if (mounted) {
          const username = response.data.data[0].username;
          const email = response.data.data[0].email;
          const name = response.data.data[0].name;
          const avatarUrl = response.data.data[0].avatar;
          setUserName(username);
          setEmail(email);
          setName(name);
          setAvatarUrl(avatarUrl);
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
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAvatarChange = (event) => {
    if (event.target.files[0]) {
      let imageFile = event.target.files[0];
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setInvalidImage("Please select valid image.");
        return false;
      } else {
        setAvatar(imageFile);
        setInvalidImage(null);
      }
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
            setLoading(false);
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
      name: name,
      avatar: avatarUrl,
    };
    axios
      .put(userInfoUrl, sendData)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data !== "Update successful") {
          setMessage(response.data.data);
          // setHasError(true);
          // setTimeout(() => {
          //   setHasError(false);
          // }, 5000);
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
  if (isAuthenticated === null) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <h3>Please log in to see profile</h3>;
  }
  return (
    <Fragment>
      {hasError && <ErrorAlert message={message} />}
      <div style={{ width: "80vw" }} className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-xs-10 col-12">
          <h3 className="text-center">Your Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name ? name : ""}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={
                  message === "Username is already taken"
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="username"
                value={username}
                onChange={handleUserNameChange}
                required
              />
              {message === "Username is already taken" && (
                <p style={{ marginTop: 5, color: "red" }}>{message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={
                  message === "Email is already taken"
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {message === "Email is already taken" && (
                <p style={{ marginTop: 5, color: "red" }}>{message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <br />
              <div className="row">
                <div className="col-md-8 col-12">
                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="col-md-4 col-6 d-md-flex justify-content-md-end mt-md-0 mt-3">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUpload}
                    disabled={avatar ? false : true}
                  >
                    Upload
                  </button>
                </div>
              </div>
              {invalidImage && <p className="text-danger">{invalidImage}</p>}
              <div className="d-flex justify-content-center  mt-3">
                {loading ? (
                  <CircularProgress variant="static" value={progress} />
                ) : avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    id="avatar-preview"
                    style={{ width: 250, height: 250 }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center mb-3">
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
