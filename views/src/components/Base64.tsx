import React from "react";
import { Button, Input } from "@material-ui/core";

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
    <div>
      <label htmlFor="inputFileForm">
        <p>画像をアップロードして下さい</p>
        <figure>
          <img src={props.dataUriImage} alt="" />
        </figure>
        <input id="inputFileForm" type="file" onChange={previewImage} />
      </label>
    </div>
  );
};

export default Base64;
