import React from "react";
import styled from "styled-components";

interface Props {
  dataUriImage: string;
  setDataUriImage: React.Dispatch<React.SetStateAction<string>>;
}

const Base64: React.FC<Props> = (props) => {
  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
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
        <p>画像をアップロードして下さい</p>
      )}
      <input type="file" onChange={previewImage} />
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
  min-height: 300px;
  max-height: 500px;
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
      max-height: 500px;
      object-fit: cover;
    }
  }
`;
