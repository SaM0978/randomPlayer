import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import UploadVideo from "./components/UploadVideo";

function App() {
  let isLogged = false;
  useEffect(() => {
    if (logstatus == undefined) {
      elemebt;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogged ? <Home /> : <LoginPage />} />
          <Route path="/video" element={<UploadVideo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
