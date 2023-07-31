import React from "react";
import styled from "styled-components";
import GIF from "../assets/Home Video.mp4";

const VideoContainer = styled.div`
  width: 100%;
  position:absolute;

  video {
    width: 100%;
    height: auto;
    z-index:0;
  }

  @media (max-width: 64em) {
    min-width: 40vh;
  }
`;

const CoverVideo = () => {
  return (
    <VideoContainer>
      <video src="https://player.vimeo.com/external/432472483.sd.mp4?s=a178a28d4656dbfb05bcb5e02e89785a3a9fd0ad&profile_id=164&oauth2_token_id=57447761" type="video/mp4" autoPlay muted loop />
    </VideoContainer>
  );
};

export default CoverVideo;
