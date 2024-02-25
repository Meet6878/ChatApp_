import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";
const Contacts = ({ contact, currentUser, chatChange }) => {
  const [currentUserName, SetcurrentUserName] = useState(undefined);
  const [currentUserImage, SetcurrentUserImage] = useState(undefined);
  const [currentSelected, SetcurrentSelected] = useState(undefined);

  useEffect(() => {
    SetcurrentUserName(currentUser.name);
    SetcurrentUserImage(currentUser.avatarImage);
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    SetcurrentSelected(index);
    chatChange(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h2>Chat-App</h2>
          </div>
          <div className="contacts">
            {contact.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              alt="avatar"
            />

            <div className="username">
              <h2>{currentUser.name}</h2>
            </div>
          </div>
        </Container>
      )}
      {/* {!currentUserName && !currentUserImage && <div>no name are there</div>} */}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  @media screen and (max-width: 768px) {
    grid-template-rows: 15% 70% 15%;
  }

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h2 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 0 1rem; /* Add padding for better spacing */

    @media screen and (max-width: 768px) {
      padding: 0; /* Remove padding for mobile and tablet */
    }

    &::-webkit-scrollbar {
      width: 0.2rem;
      background-color: #ffffff39;
      &thumb {
        width: 0.1rem;
        background-color: #ffffff39;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff39;
      width: 90%;
      min-height: 5rem;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 4rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    img {
      height: 4rem;
      max-inline-size: 100%;
    }
    h2 {
      color: white;
    }
  }
`;
export default Contacts;
