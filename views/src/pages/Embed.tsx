import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Button,
  TextField,
  Modal,
  CircularProgress,
  Box,
} from "@material-ui/core";

import Base64 from "../components/Base64";
import ResultImage from "../components/ResultImage";

const Embed: React.FC = () => {
  const [dataUriImage, setDataUriImage] = useState("");
  const [embedImageBase64, setEmbedImageBase64] = useState("");
  const [embedText, setEmbedText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dataUriOption = dataUriImage.split(",")[0];
  const imageBase64 = dataUriImage.split(",")[1];
  const dataUriEmbedImage = `${dataUriOption},${embedImageBase64}`;

  const embedWatermark = () => {
    if (dataUriImage) {
      axios
        .post("/api/embed", {
          image: imageBase64,
          text: embedText,
        })
        .then(function (response: any) {
          setEmbedImageBase64(response.data.image);
          setIsOpen(true);
        })
        .finally(() => {});
    } else {
      console.log("空です");
    }
  };

  const changeEmbedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmbedText(e.target.value);
  };

  return (
    <Wrapper>
      <Base64 dataUriImage={dataUriImage} setDataUriImage={setDataUriImage} />
      <div className="inputWrap">
        <TextField
          value={embedText}
          label="署名"
          variant="outlined"
          onChange={changeEmbedText}
          className="inputText"
        />
      </div>

      <div className="buttonWrap">
        <Button
          type="button"
          onClick={embedWatermark}
          variant="contained"
          color="primary"
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
      {/* {dataUriImage && <ResultImage dataUriImage={dataUriImage} />} */}
    </Wrapper>
  );
};

export default Embed;

const Wrapper = styled.div`
  .inputWrap {
    margin: 30px 0;
    text-align: center;
  }

  .inputText {
    width: 70%;
  }
  .buttonWrap {
    text-align: center;

    button {
      width: 100px;
    }
  }
`;
