import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

interface Props {
  dataUriImage: string;
  setDataUriImage: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const CAN_MIME_IMAGE = {
  PNG: "image/png",
} as const;
type CAN_MIME_IMAGE = typeof CAN_MIME_IMAGE[keyof typeof CAN_MIME_IMAGE]; // 'iOS' | 'Android'

const Base64: React.FC<Props> = (props) => {
  const sizeLimit = 1024 * 1024 * 1;

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setErrorMessage("");

    if (e.target.files?.length === 1) {
      //バリデーション
      if (
        e.target?.files[0].size > sizeLimit ||
        e.target?.files[0].type !== CAN_MIME_IMAGE.PNG
      ) {
        props.setErrorMessage("画像は1MB未満のpng画像のみ対応しています");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        props.setDataUriImage(e.target.result as string);
      };
      reader.readAsDataURL(e.target?.files[0]);
    } else {
      props.setDataUriImage("");
    }
  };

  return (
    <InputFileArea>
      {props.dataUriImage ? (
        <figure>
          <img src={props.dataUriImage} alt="" />
        </figure>
      ) : (
        <>
          <p className="button">画像を選択するかドラッグして下さい</p>
          <Button type="button" variant="contained" color="primary">
            画像を選択する
          </Button>
        </>
      )}
      <input type="file" onChange={previewImage} accept=".png" required />
    </InputFileArea>
  );
};

export default Base64;

const InputFileArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  padding: 20px;
  border: 1px black dashed;
  position relative;
  overflow: hidden;

  input {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    &:hover {
      cursor: pointer;
    }
  }

  background: rgba(0, 0, 0, 0.05);
  transition: 0.2s ease-out !important;
  &:hover {
    opacity: 0.7;
  }

  figure {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    img {
      display: block;
      height:auto;
      max-width:100%;
      max-height: 300px;
      object-fit: cover;
    }
  }
`;
