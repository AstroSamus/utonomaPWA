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
        source = { "https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/o4GBGnDgFNO7yRSeVRvuAB1EE73QIJgfQlS5AE/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C&cv=1&br=1792&bt=896&bti=NDU3ZjAwOg%3D%3D&cs=0&ds=6&ft=4fUEKMtN8Zmo01pGT94jVUKBDpWrKsd.&mime_type=video_mp4&qs=0&rc=OzQ7NThkOTU6ODU0Zjc0M0BpajppOnc5cmhscTMzNzczM0BfYy4vNTReXi0xMGNiMV9iYSNfaTRlMmRzMDFgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1709040373&l=20240225132509A716D552852644D7B071&ply_type=2&policy=2&signature=7f8b6bb38c9382b1f7957b2a49079b76&tk=tt_chain_token" }
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { "https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/o4GBGnDgFNO7yRSeVRvuAB1EE73QIJgfQlS5AE/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C&cv=1&br=1792&bt=896&bti=NDU3ZjAwOg%3D%3D&cs=0&ds=6&ft=4fUEKMtN8Zmo01pGT94jVUKBDpWrKsd.&mime_type=video_mp4&qs=0&rc=OzQ7NThkOTU6ODU0Zjc0M0BpajppOnc5cmhscTMzNzczM0BfYy4vNTReXi0xMGNiMV9iYSNfaTRlMmRzMDFgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1709040373&l=20240225132509A716D552852644D7B071&ply_type=2&policy=2&signature=7f8b6bb38c9382b1f7957b2a49079b76&tk=tt_chain_token" }
      />
      <VideoCard 
        posterURL={ "https://i1.wp.com/detechter.com/wp-content/uploads/2015/11/romain-3.gif?fit=500%2C700&ssl=1" } 
        source = { "https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/o4GBGnDgFNO7yRSeVRvuAB1EE73QIJgfQlS5AE/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C&cv=1&br=1792&bt=896&bti=NDU3ZjAwOg%3D%3D&cs=0&ds=6&ft=4fUEKMtN8Zmo01pGT94jVUKBDpWrKsd.&mime_type=video_mp4&qs=0&rc=OzQ7NThkOTU6ODU0Zjc0M0BpajppOnc5cmhscTMzNzczM0BfYy4vNTReXi0xMGNiMV9iYSNfaTRlMmRzMDFgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1709040373&l=20240225132509A716D552852644D7B071&ply_type=2&policy=2&signature=7f8b6bb38c9382b1f7957b2a49079b76&tk=tt_chain_token" }
      />
    </>
  );
}   