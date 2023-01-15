import styled from "styled-components";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const Modal = ({ closeModal, picture }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <ModalContainer onClick={handleClick}>
      <ModalWindow>
        <img src={picture} alt="" />
      </ModalWindow>
    </ModalContainer>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  picture: PropTypes.string,
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

const ModalWindow = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
