import { Button } from 'primereact/button';  
import { styled } from 'styled-components'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState, useRef } from "react";
import VideoCard from './VideoCard';


export default function VideoReel({ Component, pageProps }) {    
  return (
    <>
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
      />
    </>
  );
}   