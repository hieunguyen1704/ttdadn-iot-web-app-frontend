import React,{useState} from "react";
import {config} from "../../../config";
import axios from "axios";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const sendData = {
            email: email
        }
        const resetPassUrl = config.dbURl + config.api.resetPassword;
        axios.post(resetPassUrl, sendData).then((response) =>{
            setMessage(response.data.message);
            if(response.data.isSuccess == false){
                setHasError(true);
            }else{
                setHasError(false);
            }
        }).catch((error) =>{
            console.log(error)
        })
    }
  return (
    <div style={{ width: "80vw" }} className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-xs-10 col-12">
        <h3 className="text-center">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              className={hasError ? "form-control is-invalid": "form-control"}
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <p style={{ marginTop: 5}} className={hasError ? "text-danger" : "text-success"}>{message}</p>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary">
              Get Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
