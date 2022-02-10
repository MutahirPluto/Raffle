import  React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import axios from "axios"
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../utils/connectors"
import styles from "../styles/Login.module.css"
import { ethers, BigNumber } from 'ethers'
import Link from 'next/link';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown,  Modal } from "react-bootstrap";
// import {parse} from "csv-parse/lib/sync"
// const parse = require("csv-parse/lib/sync")
import readXlsxFile from 'read-excel-file'
export default function WhiteList() {

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


      function onKeyUp(event) {

    if(event.target.files.length>0){
        let file = event.target.files[0];
        console.log("file", file)
        var count = 0
        var arr = []
        let hello = readXlsxFile(file).then((rows) => {
            console.log("address", rows.map((i) => {
              if(count <=0 ){
                count++
              }
              else{
                console.log("i", i[1])
                arr.push(i[1])
              }
            }))

            console.log("array>>", arr)
        })
        // let whiteListTempArr = [];
        // const reader = new window.FileReader();
        // reader.readAsArrayBuffer(file);
        // reader.onloadend = () => {
        //     const records = parse(Buffer(reader.result), {
        //         columns: false,
        //         skip_empty_lines: true,
        //     });
        //     records.map((item)=>{
        //         whiteListTempArr.push(ethers.utils.getAddress(item[0]))
        //     })
            
        //     console.log("whiteListTempArr", whiteListTempArr)
        // };
    }



    }

 

  return (
   <div>
       <div>
       <Form.Control type="file" placeholder="Whitelist Addresses" onChange={(e)=>onKeyUp(e)} />
       <div>
           jj
       </div>
       </div>
   </div>
  );
}