import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef } from "react";

const VideoContainer = styled.div`
  min-block-size: 100vh;
  inline-size: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  @media only screen and (orientation:landscape) {
    max-height: 100vh;
    max-width: 70vw;
  }
  `;

const Player = styled.video`
  max-width: 100%
`

export default function VideoCard({ posterURL }) {    
  return (
    <VideoContainer> 
      <Player poster = { posterURL }></Player>
    </VideoContainer>
  );
}   