import React, { useEffect, useRef } from "react";
import Analyser from "./Analyser";
import videojs from "video.js";
import "./App.css";

const videoJsOptions = {
  autoplay: true,
  controls: true,
  width: 400,
  height: 300,
  sources: [
    {
      // src: process.env.PUBLIC_URL + "/Grooverider_-_Rainbows_Of_Colour_Video.mp4",
      // type: "video/mp4",
      src: "https://cdn-hlm-1.streamnerd.nl/live/operator/playlist.m3u8",
      type: "application/x-mpegURL"
    }
  ]
};

export const Video = props => {
  const videoNode = useRef();
  useEffect(() => {
    const player = videojs(
      videoNode.current,
      { ...props },
      function onPlayerReady() {
        Analyser();
      }
    );
    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js" />
    </div>
  );
};

export const App = () => {
  return (
    <React.Fragment>
      <div className="canvas">
        <canvas />
      </div>
      <div className="source">
        <div className="video">
          <Video {...videoJsOptions} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
