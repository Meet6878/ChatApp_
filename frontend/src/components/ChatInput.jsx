import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const [ShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  // const [chosenEmoji, setChosenEmoji] = useState(null);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!ShowEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg(" ");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />

          {ShowEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Enter your massage..."
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #080420;
  padding: 1rem;

  .emoji-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
  }

  form {
    flex: 1;
    display: flex;
    align-items: center;

    input {
      flex: 1;
      height: 40px;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      margin-right: 1rem;
      font-size: 1rem;
    }

    button {
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #9a86f3;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;

      svg {
        font-size: 1.5rem;
      }

      &:hover {
        background-color: #7a63d8;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .emoji-container {
      margin-right: 0.5rem;
    }

    form {
      input {
        font-size: 0.9rem;
      }

      button {
        padding: 0.4rem;
        svg {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

export default ChatInput;
