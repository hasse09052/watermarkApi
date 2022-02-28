import React from "react";
import styled from "styled-components";
import { Modal, CircularProgress } from "@mui/material";
import { styled as styledMui } from "@mui/material/styles";

const Loading = () => {
  return (
    <Modal open={true}>
      <CircularWrapper>
        <CustomCircularProgress />
      </CircularWrapper>
    </Modal>
  );
};

export default Loading;

const CircularWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomCircularProgress = styledMui(CircularProgress)({
  width: "100px !important",
  height: "100px !important",
  ":focus": {
    outline: 0,
  },
});
