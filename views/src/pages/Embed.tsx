import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  TextField,
  Modal,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";

import Base64 from "../components/Base64";
import ResultImage from "../components/ResultImage";

const Embed: React.FC = () => {
  const [dataUriImage, setDataUriImage] = useState("");
  const [embedImageBase64, setEmbedImageBase64] = useState("");
  const [embedText, setEmbedText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmbedText, setIsValidEmbedText] = useState(true);

  const dataUriOption = dataUriImage.split(",")[0];
  const imageBase64 = dataUriImage.split(",")[1];
  const dataUriEmbedImage = `${dataUriOption},${embedImageBase64}`;

  const embedWatermark = () => {
    if (dataUriImage) {
      setIsLoading(true);
      axios
        .post("/api/embed", {
          image: imageBase64,
          text: embedText,
        })
        .then(function (response: any) {
          setEmbedImageBase64(response.data.image);
          setIsOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("空です");
    }
  };

  const changeEmbedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.length === 0 ||
      !e.target.value.match(/^[a-zA-Z0-9]+$/)
    ) {
      setIsValidEmbedText(false);
    } else {
      setIsValidEmbedText(true);
    }
    setEmbedText(e.target.value);
  };

  return (
    <Wrapper>
      <Base64 dataUriImage={dataUriImage} setDataUriImage={setDataUriImage} />

      <div className="inputContainer">
        <div className="inputWrap">
          <TextField
            value={embedText}
            label="署名"
            variant="outlined"
            onChange={changeEmbedText}
            className="inputText"
            error={!isValidEmbedText}
          />
        </div>
        <ul className="annotation">
          <li>画像は1MB未満のpng画像のみ対応しています</li>
          <li>署名は半角英数字のみ可能です</li>
          <li>画像は保存されませんのでご安心下さい</li>
        </ul>
      </div>

      <div className="buttonWrap">
        <Button
          type="button"
          onClick={embedWatermark}
          variant="contained"
          color="primary"
          disabled={
            dataUriImage.length === 0 ||
            !isValidEmbedText ||
            embedText.length === 0
          }
        >
          送信
        </Button>
      </div>

      {isOpen && (
        <ResultImage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dataUriImage={dataUriEmbedImage}
        />
      )}

      {isLoading && (
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomCircularProgress />
        </Modal>
      )}
    </Wrapper>
  );
};

export default Embed;

const Wrapper = styled.div`
  .inputContainer {
    width: 80%;
    margin: 0 auto;
  }

  .inputWrap {
    margin: 30px auto 15px;
  }

  .annotation {
    padding: 0;
    margin: 0 0 20px;
    list-style: none;

    li {
      padding: 0 0 0 1.5em;
      position: relative;

      &:before {
        content: "※";
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  .inputText {
    width: 100%;
  }
  .buttonWrap {
    text-align: center;

    button {
      width: 100px;
    }
  }
`;

const CustomCircularProgress = styledMui(CircularProgress)({
  width: "100px !important",
  height: "100px !important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  ":focus": {
    outline: 0,
  },
});
