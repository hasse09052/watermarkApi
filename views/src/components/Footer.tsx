import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrap>
      <p>&copy; 2022 hasse09052</p>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.footer`
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  position: absolute;
  bottom: 0;
`;
