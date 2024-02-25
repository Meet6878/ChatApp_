import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { RegisterRoute } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";

const Ragister = () => {
  const navigate = useNavigate();
  const [Formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setFormdata({ ...Formdata, [e.target.name]: e.target.value });
  };
  const handleValidate = async () => {
    try {
      const { name, email, password, cpassword } = Formdata;
      if (!name) {
        toast.error("Please enter your name", toastOptions);
        return false;
      }
      if (!email) {
        toast.error("Please enter your email", toastOptions);
        return false;
      }
      if (!password) {
        toast.error("Please enter your password", toastOptions);
        return false;
      }
      if (!cpassword) {
        toast.error("Please enter your confirm-password", toastOptions);
        return false;
      } else if (password !== cpassword) {
        toast.error("passwoed and conform password not match", toastOptions);
        return false;
      } else if (name.length < 2) {
        toast.error("enter valid name", toastOptions);
        return false;
      } else if (password.length < 5) {
        toast.error("password must be 6 character", toastOptions);
        return false;
      }
      return true;
    } catch (error) {
      toast.error("validation error", toastOptions);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await handleValidate()) {
      const { name, email, password, cpassword } = Formdata;

      try {
        const response = await axios.post("/api/auth/register", Formdata);
        // console.log(response.data.newUsers);
        if (response) {
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(response.data.newUsers)
          );
          toast.success(response.data.message, toastOptions);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error("not ragister", toastOptions);
        }
      } catch (error) {
        if (error.response) {
          // console.log("error", error.response.data.message);
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("something worngs", toastOptions);
      return false;
    }
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="signUp">
            <img src={logo} alt="logo" />
            <h1>Sign - Up</h1>
          </div>
          <input
            type="text"
            value={Formdata.name}
            placeholder="Enter your name"
            onChange={(e) => handleChange(e)}
            name="name"
          />
          <input
            type="email"
            value={Formdata.email}
            placeholder="Enter your email"
            onChange={(e) => handleChange(e)}
            name="email"
          />
          <input
            type="password"
            value={Formdata.password}
            placeholder="Enter your password"
            onChange={(e) => handleChange(e)}
            name="password"
          />
          <input
            type="password"
            value={Formdata.cpassword}
            placeholder="Enter your confirm-password"
            onChange={(e) => handleChange(e)}
            name="cpassword"
          />
          <button type="submit">submit</button>
          <span>
            already have account ? please <Link to="/login">login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100wh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  gap: 1rem;
  color: white;
  .signUp {
    display: flex;
    justify-content: centre;
    align-items: center;
    gap: 1rem;
    img {
      height: 150px;
      width: 100px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      padding: 1rem;
      background-color: transparent;
      border: 0.1rem solid #4e0eff;
      width: 100%;
      font-size: 1rem;
      color: white;
      border-radius: 0.4rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #997af0;
      }
    }
    span {
      text-transform: uppercase;
      a {
        color: #4848f5;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
  @media screen and (max-width: 768px) {
    form {
      padding: 3rem 2rem; /* Adjust padding for smaller screens */
    }
  }

  @media screen and (max-width: 480px) {
    form {
      padding: 3rem 1rem; /* Further adjust padding for even smaller screens */
    }
  }
`;

export default Ragister;
