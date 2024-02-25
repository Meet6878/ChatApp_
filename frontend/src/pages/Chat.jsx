import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { allUsers, host } from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Loader from "../assets/loader.gif";
import Welcome from "../components/Welcome";
import ChatCointainer from "../components/ChatCointainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [contact, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCcurrentChat] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  var crr;
  //check user is logged in or not
  const getAllusers = async (crr) => {
    try {
      // console.log("crr", crr);
      if (crr) {
        if (crr.isAvatarImageSet) {
          const data = await axios.get(`${"/api/auth/allusers"}/${crr._id}`);
          setContacts(data.data);
          setCurrentUser(crr);
        } else {
          navigate("/setavatar");
        }
      } else {
        console.log("no current user get");
      }
    } catch (error) {
      console.log("error while get user", error);
    }
  };
  const checkUser = async () => {
    setLoading(true);
    let chatAppUser_FromStore = localStorage.getItem("chat-app-user");
    if (!chatAppUser_FromStore) {
      navigate("/login");
    } else {
      crr = JSON.parse(chatAppUser_FromStore);
      if (crr) {
        await getAllusers(crr);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    checkUser();
  }, []);

  const handleChatChange = (chat) => {
    setCcurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  return (
    <>
      {loading ? (
        <div>{Loader}</div>
      ) : (
        <Container>
          <div className="container">
            <Contacts
              contact={contact}
              currentUser={currentUser}
              chatChange={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatCointainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    /* @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-auto-rows: 15% 70% 15%;
    } */
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr; /* Change to a single column layout for mobile and tablet */
      height: auto; /* Let the height adjust based on content */
      width: 100%; /* Occupy the full width */
    }
  }
`;

export default Chat;
