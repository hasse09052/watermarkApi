import React from "react";
import styled from "styled-components";

import "sanitize.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Embed } from "./pages/Pages";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AppContainer className="App">
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Embed />} />
            <Route path="/decode" element={<Embed />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div({
  minHeight: "100vh",
  padding: "0 0 120px",
  position: "relative",
  boxSizing: "border-box",
});

const Container = styled.div({
  width: "600px",
  margin: "0 auto",
});
