import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

const PageTitle: React.FC<Props> = (props) => {
  return <Title>{props.title}</Title>;
};

export default PageTitle;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 28px;
  text-align: center;
`;
