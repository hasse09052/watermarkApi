import React, { useEffect } from "react";
import { Button, Modal, Box } from "@mui/material";
import styled from "styled-components";

interface Props {
  dataUriImage: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultImage: React.FC<Props> = (props) => {
  const handleClose = () => props.setIsOpen(false);

  return (
    <Modal
      open={props.isOpen}
      onClick={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContent}>
        <TextWrap>
          <h3>署名に成功しました</h3>
          <p>ダウンロードボタンか右クリックで保存して下さい</p>
        </TextWrap>
        <Figure>
          <img src={props.dataUriImage} alt="" />
        </Figure>
        <ButtonWrap>
          <Button
            href={props.dataUriImage}
            color="secondary"
            download="watermark.png"
            variant="contained"
          >
            Download
          </Button>
        </ButtonWrap>
      </Box>
    </Modal>
  );
};

export default ResultImage;

const modalContent = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TextWrap = styled.div`
  text-align: center;
  h3 {
    margin: 0 0 20px;
  }

  p {
    margin: 0 0 40px;
  }
`;

const Figure = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  img {
    display: block;
    height: auto;
    max-width: 100%;
    max-height: 500px;
    object-fit: cover;
  }
`;

const ButtonWrap = styled.figure`
  margin: 30px 0 0;
  text-align: center;
`;
