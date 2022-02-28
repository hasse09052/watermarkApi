import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, margin: "0 0 30px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ぱくきん
          </Typography>
          <Button color="inherit">署名</Button>
          <Button color="inherit">解読</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
