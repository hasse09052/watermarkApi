import React from "react";
import styled from "styled-components";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Embed from "./pages/Embed";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Embed />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div({
  width: "600px",
  margin: "0 auto",
});
