import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import UploadVideo from "./components/UploadVideo";

function App() {
  let isLogged = false
  useEffect(() => {
    const logStatus = sessionStorage.getItem("loginStatus");
    if (logStatus) {
      isLogged = true
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogged ? <Home/> : <LoginPage/>} />
          <Route path="/video" element={<UploadVideo/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
