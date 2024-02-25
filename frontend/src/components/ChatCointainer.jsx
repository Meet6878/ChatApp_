import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { addMassage, getAllMassage } from "../utils/AuthApi";
import { v4 as uuidv4 } from "uuid";

export default function ChatCointainer({ currentChat, currentUser, socket }) {
  const [massages, setmassages] = useState([]);
  const [arrivalMessage, setarraivalMassages] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    await axios.post(`${"/api/massage/addmassage"}`, {
      from: currentUser._id,
      to: currentChat._id,
      massage: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      massage: msg,
    });
    const msgs = [...massages];
    msgs.push({ fromSelf: true, massage: msg });
    setmassages(msgs);
    // setmassages([...massages, { fromSelf: true, massage: msg }]);
  };

  const getMassages = async () => {
    if (currentChat) {
      const response = await axios.post("/api/massage/getmassage", {
        from: currentUser._id,
        to: currentChat._id,
      });
      setmassages(response.data);
    }
  };
  useEffect(() => {
    getMassages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log({ msg });

        setarraivalMassages({ fromSelf: false, massage: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setmassages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [massages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="user-name">
                <h3>{currentChat.name}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-massages">
            {massages.map((massage) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`massage ${
                      massage.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{massage.massage}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  gap: 0.1rem;
  overflow: hidden;
  grid-template-rows: auto 1fr auto; /* Adjusted row heights for responsiveness */

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem; /* Adjusted padding for smaller screens */

    .user-details {
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Reduced gap between elements */

      .avatar {
        img {
          height: 2.5rem; /* Adjusted avatar height */
        }
      }
      .user-name {
        font-size: 1rem; /* Adjusted font size */
        color: white;
      }
    }
  }

  .chat-massages {
    padding: 0 1rem; /* Adjusted padding for smaller screens */
    gap: 0.5rem; /* Reduced gap between messages */
    overflow-y: auto; /* Ensures messages scroll if overflow */
    color: white;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .massage {
      display: flex;
      align-items: center;
      .content {
        max-width: 60%; /* Adjusted max-width for better readability */
        overflow-wrap: break-word;
        padding: 0.5rem; /* Adjusted padding */
        font-size: 0.9rem; /* Adjusted font size */
        border-radius: 1rem;
        border-color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .chat-header {
      padding: 0 0.5rem; /* Further reduced padding for smaller screens */
      .user-details {
        gap: 0.25rem; /* Further reduced gap between elements */
        .avatar {
          img {
            height: 2rem; /* Adjusted avatar height */
          }
        }
        .user-name {
          font-size: 0.9rem; /* Adjusted font size */
        }
      }
    }
    .chat-massages {
      padding: 0 0.5rem; /* Further reduced padding for smaller screens */
      .content {
        max-width: 80%; /* Adjusted max-width for better readability */
        padding: 0.3rem; /* Further reduced padding */
        font-size: 0.8rem; /* Adjusted font size */
      }
    }
  }

  @media screen and (max-width: 480px) {
    .chat-header {
      padding: 0.5rem 0.5rem; /* Adjusted padding for smaller screens */
      .user-details {
        gap: 0.15rem; /* Further reduced gap between elements */
        .avatar {
          img {
            height: 1.5rem; /* Adjusted avatar height */
          }
        }
        .user-name {
          font-size: 0.8rem; /* Adjusted font size */
        }
      }
    }
    .chat-massages {
      padding: 0 0.3rem; /* Further reduced padding for smaller screens */
      .content {
        max-width: 90%; /* Adjusted max-width for better readability */
        padding: 0.2rem; /* Further reduced padding */
        font-size: 0.7rem; /* Adjusted font size */
      }
    }
  }
`;
