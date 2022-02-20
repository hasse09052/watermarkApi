import React, { useState } from "react";
import Base64 from "../components/Base64";
import axios from "axios";
import { Button, TextField, Link, CircularProgress } from "@material-ui/core";

const Embed: React.FC = () => {
  const [dataUriImage, setDataUriImage] = useState("");
  const [embedImageBase64, setEmbedImageBase64] = useState("");
  const [embedText, setEmbedText] = useState("");

  const dataUriOption = dataUriImage.split(",")[0] + ",";
  const base64 = dataUriImage.split(",")[1];
  const dataUriEmbedImage = dataUriOption + embedImageBase64;

  const embedWatermark = () => {
    if (dataUriImage) {
      axios
        .post("/api/embed", {
          image: base64,
          text: embedText,
        })
        .then(function (response: any) {
          setEmbedImageBase64(response.data.image);
        });
    } else {
      console.log("空です");
    }
  };

  const changeEmbedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmbedText(e.target.value);
  };

  return (
    <>
      <form>
        <Base64 dataUriImage={dataUriImage} setDataUriImage={setDataUriImage} />
        <div>
          <TextField
            value={embedText}
            label="埋め込むテキスト"
            variant="outlined"
            onChange={changeEmbedText}
          />
        </div>

        <Button
          type="button"
          onClick={embedWatermark}
          variant="contained"
          color="primary"
        >
          送信
        </Button>
      </form>
      <img src={dataUriEmbedImage} alt="" />
      <a href={dataUriEmbedImage} download="watermark.png">
        ダウンロード
      </a>
      <Link href={dataUriEmbedImage} color="primary" download="watermark.png">
        {'color="inherit"'}
      </Link>
      <CircularProgress />
    </>
  );
};

export default Embed;
