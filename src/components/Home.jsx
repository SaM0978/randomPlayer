import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="container">
      <div className="box">
        <h2>Your Random Video video.name</h2>
        <div className="videoPlayer">
          <video controls className="videoplayer">
            <source src="Test\Main Comp.mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
