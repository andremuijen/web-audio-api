/*
function VideoPlayer(props) {
  const { videoSrc } = props;
  const playerRef = useRef();

  useEffect(() => {
    const player = videojs(playerRef.current, { autoplay: true, muted: true }, () => {
      player.src(videoSrc);
    });

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js vjs-16-9" playsInline />
    </div>
  );
}
*/


import React, { useEffect, useRef } from "react";
//import { render } from "react-dom";
import Analyser from './Analyser';
import videojs from "video.js";
import "./App.css";

export const Video = (props) => {
  //const { settings } = props;
  const videoNode = useRef();
console.log(props)
  useEffect(() => {
    const player = videojs(videoNode.current, {...props}, function onPlayerReady() {
      console.log("onPlayerReady", this);
      //player.src('./Grooverider_-_Rainbows_Of_Colour_Video.mp4');
      Analyser();
    });
    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoNode} className="video-js" />
      </div>
    </div>
  );
};

export const App = () => {
  //useEffect(() => {});

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    width: 400,
    height: 300,
    sources: [
      {
        src: process.env.PUBLIC_URL + "/Grooverider_-_Rainbows_Of_Colour_Video.mp4", //"https://cdn-hlm-1.streamnerd.nl/live/operator/playlist.m3u8",
        type: "video/mp4" //"application/x-mpegURL"
      }
    ]
  };

  return (
    <div className="App">
      <div className="source"><Video {...videoJsOptions} /></div>
      <div className="canvas"><canvas></canvas></div>
    </div>
  );
};

//const rootElement = document.getElementById("root");
//render(<App />, rootElement);
export default App;