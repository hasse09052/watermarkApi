import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";

import Base64 from "../components/Base64";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";

const Decode = () => {
  const [dataUriImage, setDataUriImage] = useState("");
  const [decodeText, setDecodeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageBase64 = dataUriImage.split(",")[1];

  const embedWatermark = () => {
    if (dataUriImage) {
      setIsLoading(true);
      axios
        .post("/api/decode", {
          image: imageBase64,
        })
        .then(function (response: any) {
          setDecodeText(response.data.text);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Wrapper>
      <PageTitle title="解読" />
      <Base64 dataUriImage={dataUriImage} setDataUriImage={setDataUriImage} />

      <ul className="annotation">
        <li>画像は1MB未満のpng画像のみ対応しています</li>
        <li>画像は保存されませんのでご安心下さい</li>
      </ul>

      <div className="buttonWrap">
        <Button
          type="button"
          onClick={embedWatermark}
          variant="contained"
          color="primary"
          disabled={dataUriImage.length === 0}
        >
          送信
        </Button>
      </div>

      {decodeText && (
        <div className="inputContainer">
          <div className="inputWrap">
            <CustomTextField
              value={decodeText}
              label="解読結果"
              variant="outlined"
              className="inputText"
              focused
              color="success"
            />
          </div>
        </div>
      )}

      {isLoading && <Loading />}
    </Wrapper>
  );
};

export default Decode;

const Wrapper = styled.div`
  .inputContainer {
    width: 80%;
    margin: 0 auto;
  }

  .inputWrap {
    margin: 30px auto 15px;
  }

  .annotation {
    width: 80%;
    padding: 0;
    margin: 20px auto;
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

const CustomTextField = styledMui(TextField)({
  input: {
    color: "#000 !important",
    WebkitTextFillColor: "currentcolor !important",
  },
});
