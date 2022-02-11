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
import Web3Modal from 'web3modal'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown,  Modal } from "react-bootstrap";
import {nftPreSale_addr,nft_addr} from "../pages/contract/addresses"
import NFTCrowdsale from "../pages/contract/NFTCrowdsale.json"
import NFT from "../pages/contract/NFT.json"
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

      const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        }
        catch (e) {
            console.log("loadProvider: ", e)
            
        }
    }

      const [addr, setAddr] = useState([])
      const [checkWhiteList, setcheckWhiteList] = useState()
      const [iswhitelist, setiswhitelist] = useState(false);


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
                arr.push(ethers.utils.getAddress(i[1]))
              }
            }))
            setAddr(arr)
            console.log("array>>", arr)
        })
    }
    }

    
  // console.log("isWhiteList", iswhitelist)


    const startSale = async () => {
      try {
        if(addr.length > 0){
          let signer = await loadProvider()
          let NFTCrowdsaleContract = new ethers.Contract(nftPreSale_addr, NFTCrowdsale, signer);
          let startSale = await NFTCrowdsaleContract.startSale(addr, "0x901674Cb10e86ac943D3f09326Bd4c4E1c282103", nft_addr)
          let tx = await startSale.wait()
          let pre = await NFTCrowdsaleContract.pre()
          console.log("tx", pre)
        }
          
      } catch (e) {
          console.log("error", e)
      }
    }


    const loadWhiteList = async () => {
      try {

          let signer = await loadProvider()
          setiswhitelist(false)
          let NFTCrowdsaleContract = new ethers.Contract(nftPreSale_addr, NFTCrowdsale, signer);
          let _whitelist = await NFTCrowdsaleContract.whitelist(checkWhiteList)
          console.log("isWhitelist", _whitelist)
          setiswhitelist(_whitelist)
      } catch (e) {
          console.log("data", e)
      }
    }

  //   useEffect(() => {
  //     (async () => {
  //         if (account) {
  //             try {
  //               loadWhiteList()

  //             } catch (error) {
  //                 console.log(error)
  //             }
  //         }
  //     })()
  // }, [account]);

    console.log("setCheckWhiteList", checkWhiteList)
    console.log("Arr>>", addr)


  return (
   <div>
       <Form.Control type="file" placeholder="Whitelist Addresses" onChange={(e)=>onKeyUp(e)} />
       <div>
          <button onClick={startSale} >Start Sale</button>
       </div>
       {/* <div>
          <button onClick={loadWhiteList} >Check WhiteList</button>
       </div> */}

        <div style={{textAlign:"center"}} >
        <div  style={{marginTop:"1rem"}}>
       <p className='whitelist'>
              {
                iswhitelist == true ? (

                  <p className="green-head">WHITELISTED</p>
                )
                                        
              : (<p className="red-head">Not WHITELISTED</p> )
                                                    
              }
        </p>
       </div>
       

       <div>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="text" placeholder="Check WhiteList" 
                                    onChange={(e) => 
                                        setcheckWhiteList(e.target.value)  }  />
                                          
                                </Form.Group>

                            
                            <button className='custom-btn btn-white' onClick={loadWhiteList}>Check</button>
       </div> 
        </div>

   </div>
  );
}