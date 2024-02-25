import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }

  @media screen and (max-width: 768px) {
    padding: 0.3rem; /* Adjust padding for tablet */
    svg {
      font-size: 1.1rem; /* Adjust icon size for tablet */
    }
  }

  @media screen and (max-width: 480px) {
    padding: 0.3rem; /* Further adjust padding for mobile */
    svg {
      font-size: 1rem; /* Further adjust icon size for mobile */
    }
  }
`;

export default Logout;
