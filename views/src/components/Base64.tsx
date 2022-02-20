import React from "react";

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
      <input type="file" onChange={previewImage} />
      <img src={props.dataUriImage} alt="" />
    </div>
  );
};

export default Base64;
