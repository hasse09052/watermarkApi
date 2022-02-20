import React, { useState } from "react";
import Base64 from "../components/Base64";
import axios from "axios";

const Embed: React.FC = () => {
  const [dataUriImage, setDataUriImage] = useState("");
  const [embedImageBase64, setembedImageBase64] = useState("");

  const dataUriOption = dataUriImage.split(",")[0] + ",";
  const base64 = dataUriImage.split(",")[1];
  const dataUriEmbedImage = dataUriOption + embedImageBase64;

  const embedWatermark = () => {
    if (dataUriImage) {
      axios
        .post("/api/embed", {
          image: base64,
          text: "testTextReact",
        })
        .then(function (response: any) {
          setembedImageBase64(response.data.image);
        });
    } else {
      console.log("空です");
    }
  };

  return (
    <>
      <form>
        <Base64 dataUriImage={dataUriImage} setDataUriImage={setDataUriImage} />
        <button type="button" onClick={embedWatermark}>
          送信
        </button>
      </form>
      <img src={dataUriEmbedImage} alt="" />
      <a href={dataUriEmbedImage} download="watermark.png">
        ダウンロード
      </a>
    </>
  );
};

export default Embed;
