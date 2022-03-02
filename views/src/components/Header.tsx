import React from "react";
import { Link } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, margin: "0 0 30px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ぱくきん
          </Typography>
          <Navigation>
            <ul>
              <li>
                <Link to="/">署名</Link>
              </li>
              <li>
                <Link to="/decode">解読</Link>
              </li>
            </ul>
          </Navigation>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

const Navigation = styled.div`
  ul {
    display: flex;
    margin: 0;
    list-style: none;

    li {
      a {
        display: block;
        padding: 10px;
        margin: 0 10px;
        color: inherit;
        text-decoration: none;
        transition: 0.2s ease-out;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;
