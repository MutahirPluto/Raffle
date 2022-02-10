import React, {useEffect} from "react";
import "../styles/globals.css";
import Header from "../components/Header"
// import Whitelist from "../components/Whitelist"
import Home from "../components/Home";
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from "axios"
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../utils/connectors"
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from '../utils/web3Library';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Router, Routes, Switch } from 'react-router-dom';

function MyApp({ Component, pageProps }) {

  const {
    connector,
    library,
    account,
    chainId,
    activate,
    deactivate,
    active,
    errorWeb3Modal,
    active: networkActive, error: networkError, activate: activateNetwork
  } = useWeb3React();

  // useEffect(() => {
  //   injectedConnector
  //     .isAuthorized()
  //     .then((isAuthorized) => {
  //       if (isAuthorized && !networkActive && !networkError) {
  //         activateNetwork(injectedConnector)
  //       }
  //     })
  //     .catch(() => {
  //     })
  // }, [activateNetwork, networkActive, networkError])

  return (
    
      <div>
        {/* <BrowserRouter> */}
         <Web3ReactProvider getLibrary={getLibrary}>
        {/* <Header />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/whitelist" element={<Whitelist />} /> */}
          {/* </Routes> */} 
          <Header />
           <Component {...pageProps} />
         </Web3ReactProvider>
      {/* </BrowserRouter> */}
      </div>
  );
}
export default MyApp;









