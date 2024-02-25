import React, { useState, useEffect } from "react";
import axios from "axios";
import { setAvatarRoute } from "../utils/AuthApi";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";

export default function SetAvatar({}) {
  const [avatars, setAvatars] = useState([]);
  const [isLoding, setIsLoading] = useState(true);
  const [selectAvatar, setSelectedAvatar] = useState(undefined);

  const navigate = useNavigate();
  const api = "https://api.multiavatar.com/45678945";
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilepic = async () => {
    if (selectAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("error to set avatar image please try again", toastOptions);
      }
    }
  };
  const fetchAvatars = async () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching avatars:", error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
    fetchAvatars();
  }, []);
  return (
    <>
      {isLoding ? (
        <Container>
          <img src={loader} alt="avatars" className="loader" />
        </Container>
      ) : (
        <>
          <Container>
            <div className="titale-container">
              <h2>Pick an Avatar as your profile picture </h2>
            </div>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className={`avatar ${
                        selectAvatar === index ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  </>
                );
              })}
            </div>
            <button onClick={setProfilepic} className="submit-btn">
              {" "}
              Set as Profile Picture
            </button>
          </Container>
          <ToastContainer />
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .titale-container {
    h2 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      margin-bottom: 1rem;
      cursor: pointer;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    margin-top: 2rem;
    width: 100%;

    &:hover {
      background-color: #997af0;
    }
  }

  @media screen and (max-width: 768px) {
    .avatars {
      .avatar {
        img {
          height: 4rem;
        }
      }
    }

    .submit-btn {
      width: 80%;
    }
  }

  @media screen and (max-width: 480px) {
    .avatars {
      .avatar {
        img {
          height: 3rem;
        }
      }
    }

    .submit-btn {
      width: 70%;
    }
  }
`;
