import React, { useState } from "react";
import axios from "axios";
import { config } from "../../../config";
import { logout } from "../Authentication/action/auth";
import { navigate } from "@reach/router";
import { useDispatch } from "react-redux";
import ErrorAlert from "../../Alert/ErrorAlert";
import { useSelector } from "react-redux";
const ChangePassword = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [requestError, setRequestError] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleCurrentPassChange = (event) => {
    setCurrentPass(event.target.value);
  };
  const handleNewPassChange = (event) => {
    setNewPass(event.target.value);
  };
  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPass !== confirmPass) {
      setError("Password doesn't match");
      return false;
    }
    const changePassUrl = config.dbURl + config.api.changePassword;
    const sendData = {
      currentPass: currentPass,
      newPass: newPass,
      confirmPass: confirmPass,
    };
    axios
      .put(changePassUrl, sendData)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data !== "Change Password Successful") {
          setError(response.data.data);
        } else {
          setError(null);
          //logout and navigate to login
          dispatch(logout());
          navigate("login");
        }
      })
      .catch((error) => {
        console.log(error);
        setRequestError(true);
        setTimeout(() => {
          setRequestError(false);
        }, 5000);
      });
  };
  if (!isAuthenticated) {
    return <h3>Please Log in to change password</h3>;
  }
  return (
    <div style={{ width: "80vw" }} className="row justify-content-center">
      {requestError && <ErrorAlert message="Can't send request" />}
      <div className="col-lg-6 col-md-8 col-xs-10 col-12">
        <h3 className="text-center">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              className={
                error === "Password is incorrect"
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="current-password"
              placeholder="Your current password"
              value={currentPass}
              onChange={handleCurrentPassChange}
              required
            />
            {error === "Password is incorrect" && (
              <p style={{ marginTop: 5, color: "red" }}>{error}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              className={
                error === "Password must have at least 6 character"
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="new-password"
              value={newPass}
              placeholder="Your new password"
              onChange={handleNewPassChange}
              required
            />
            {error === "Password must have at least 6 character" && (
              <p style={{ marginTop: 5, color: "red" }}>{error}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              className={
                error === "Password doesn't match"
                  ? "form-control is-invalid"
                  : "form-control"
              }
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPass}
              onChange={handleConfirmPassChange}
              required
            />
            {error === "Password doesn't match" && (
              <p style={{ marginTop: 5, color: "red" }}>{error}</p>
            )}
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary">
              Save Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
