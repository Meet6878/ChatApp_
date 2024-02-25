import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <>
      {currentUser && (
        <Container>
          <img src={Robot} alt="robot" />
          <h1>
            Welcome <span>{currentUser.name}</span>
          </h1>
          <h3>please select a chat for massaging...</h3>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  img {
    height: 20rem;
  }

  span {
    color: #26ef26;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 15rem; /* Adjust the height of the image for tablets */
    }

    h1 {
      font-size: 1.5rem; /* Decrease font size for smaller screens */
    }

    h3 {
      font-size: 1rem; /* Decrease font size for smaller screens */
    }
  }

  @media screen and (max-width: 480px) {
    img {
      height: 10rem; /* Further adjust the height of the image for mobile devices */
    }

    h1 {
      font-size: 1.2rem; /* Decrease font size for smaller screens */
    }

    h3 {
      font-size: 0.8rem; /* Decrease font size for smaller screens */
    }
  }
`;
export default Welcome;
