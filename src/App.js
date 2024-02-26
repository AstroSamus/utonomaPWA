import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";  
import { styled } from 'styled-components'
import Functionalities from './components/Functionalities';
import VideoReel from './components/VideoReel';
import 'primeicons/primeicons.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <div className='App-container'>
        <div className='App-reel'>
          <VideoReel></VideoReel>
        </div>
        <div className='App-functionalities'>
          <Functionalities>
          </Functionalities>
        </div>
      </div>
    </PrimeReactProvider>
  );
}