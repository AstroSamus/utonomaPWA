import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef, useEffect } from "react";

const VideoContainer = styled.div`
  min-block-size: 100vh;
  inline-size: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;

  @media only screen and (orientation:landscape) {
    max-height: 100vh;
    max-width: 70vw;
  }
  `;

const Player = styled.video`
  width: 100%;

  @media only screen and (orientation:landscape) {
    min-height: 100vh;
    width: auto;
  }
`;

const InteractionButtons  = styled.div`
  position: absolute;
  display: flex;
  gap: 8%;
  bottom: 10%;
  right: 10px;
  color: white;
`

export default function VideoCard({ posterURL, source }) { 
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  /*useEffect(async() => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
    const jsonRes = await res.json()
    setVideoUrl(data.message)
  },[])*/

  const onPlayerPress = () => {
    if(playing) {
      playerRef.current.pause()
      setPlaying(false)  
    } else {
      playerRef.current.play()
      setPlaying(true)
    }
  }

  const like = () => {
    console.log("like")
    //Check if user its loged
    //Get the fee
    //Ask the user if accepts the fee
    //Allow the smart contract to charge the fee
    //Give a like
  }

  const dislike = () => {
    console.log("dislike")
  }

  return (
    <VideoContainer> 
      <Player 
        loop 
        poster = { posterURL } 
        src = {videoUrl}
        onClick={onPlayerPress}
        ref={playerRef} 
      ></Player>
      <InteractionButtons>
        <Button icon="pi pi-heart" onClick={like}  rounded severity="help" aria-label="Favorite" />
        <Button icon="pi pi-thumbs-down" onClick={dislike} rounded severity="help" aria-label="Favorite" />
      </InteractionButtons>
    </VideoContainer>
  );
}   