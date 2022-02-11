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
// import { useWeb3React } from "@web3-react/core";
import { connectWallet } from "../utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import {injectedConnector} from "../utils/connectors"
import styles from "../styles/Login.module.css"
import Link from 'next/link';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown,  Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";





// const StyledModal = styled(ModalUnstyled)`
//   position: fixed;
//   z-index: 1300;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Backdrop = styled('div')`
//   z-index: -1;
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   -webkit-tap-highlight-color: transparent;
// `;

// const style = {
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   p: 2,
//   px: 4,
//   pb: 3,
// };

function DashboardHeader(props) {

    const [loaded, setLoaded] = useState(false)
    const [show1, setShow1] = useState(false)
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [address, setAddress] = useState(typeof window !== "undefined" ? localStorage.getItem("status") : "0")


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

      console.log("injectedConnector", injectedConnector)

      useEffect(() => {
        injectedConnector
          .isAuthorized()
          .then((isAuthorized) => {
            setLoaded(true)
            if (isAuthorized && !networkActive && !networkError) {
              activateNetwork(injectedConnector)
            }
          })
          .catch(() => {
            setLoaded(true)
          })
      }, [activateNetwork, networkActive, networkError])


    const connect = async () => {
        try{
        if(account){
            await axios.post("http://localhost:5000/api/admin/add", {
                address: account
              })
        }
        }
        catch(e){
            console.log("error", e)
        }
       
    }

    useEffect(() => {
        (async () => {
          if (account && library) {
            try {
                await axios.post("http://localhost:5000/api/admin/add", {
                    address: account
                  })
            } catch (error) {
              console.log(error);
            }
          }
        })();
      }, [account,library]);



      const logout = () => {
        setAddress("0")
        handleClose1()
        
      }
      if(typeof window !== "undefined"){

        localStorage.setItem("status", address);
    }
     
    
      const disconnect = () => {
        handleShow1()
      }

    console.log("networkError", networkError)

  return (
    <div>
         {/* <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}> 
          {
          networkError?
          <div >
          <p className={styles.errorMessage} >{networkError.toString()}</p>
          </div>
       :null
        }
          </Typography>
          {active  && address == "1" ? (
              <div>
                  <Button color="inherit" onClick={disconnect} >Disconnect</Button>
                  <Button color="inherit"  >Connected</Button>
              </div>
          ) : <Button color="inherit" onClick={() => {
            connectWallet(activate, props.setErrorMessage);
            connect()
            setAddress("1")
          }} >Connect</Button>}

          
        </Toolbar>
      </AppBar>
    </Box>
    {active ? (
              <div>
                  <StyledModal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={show1}
              onClose={handleClose1}
              BackdropComponent={Backdrop}
            >
              <Box sx={style}>
                
                <p style={{display:"flex"}} id="unstyled-modal-description">{account}</p>
                <button onClick={logout} >logout</button>
              </Box>
            </StyledModal>
              </div>
          ) : null}

{
          networkError?
          <div className="text-center">
          <span className="text-center text-red">{networkError.toString()}</span>
          </div>
       :null
        } */}

{
          networkError?
          <div className="text-center">
          <span className={styles.error}>{networkError.toString()}</span>
          </div>
       :null
        }

<Navbar  expand="lg" style={{backgroundColor:"#2C3E50"}} >
    <div class="container-fluid" >
      <Link href="/">
      <img className={styles.logo} src='https://hzpad.pluton.ltd/static/media/vector-logo.601d54a8.png'  height={80} />
      </Link>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        // style={{ maxHeight: '100px', color:"white", flex:"0.3", justifyContent:"space-between", border:"1px solid red", margin:"0px auto"}}
        navbarScroll
        id={styles.nav}
      >
          <Link href="/">
        <p className={styles.navLink}  >Home</p>
          </Link>
          <Link href="/whitelist">
        <p className={styles.navLink}  >Raffle</p>
          </Link>
      </Nav>
      
      <Form className="d-flex" >
         {
          //  networkError?<button type="button" className="btn-custom secondary-btn">Connect Wallet</button>:
           active && address ==  "1"
            ? (<div>
              
              <Button  onClick={disconnect} >Disconnect</Button>
                  <Button   >Connected</Button>
              </div>)
             : (
             <div><Button color="inherit" onClick={() => {
              connectWallet(activate, props.setErrorMessage);
              connect()
              setAddress("1")
            }} >Connect</Button>
             
            </div>
            ) 
         }

                        {active  ? (
                                
                                <Modal show={show1} onHide={handleClose1}  className='custom-modal' 
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                    <Modal.Body>
                                    <div style={{textAlign:"center"}}>
                                          <p style={{ color:"black"}} >{account}</p>
                                          <button type="button"  className="btn-custom secondary-btn" onClick={logout} >Disconnect</button>
                                    </div>
                                    </Modal.Body>
                                
                            </Modal>
                            
                        ): null}

                       
         {/* {
           active && address !== "0"  ? (<div>
             <button type="button" className="btn-custom secondary-btn">CONNECTED</button>
              <button type="button"  className="btn-custom secondary-btn" onClick={logout} >Disconnect</button>
           </div>): (<div><button onClick={() => {
              connectWallet(activate, props.setErrorMessage);
            }} type="button" className="btn-custom secondary-btn">Connect Wallet</button></div>)
         } */}
      </Form>
    </Navbar.Collapse>
  </div >
</Navbar>




    </div>
  );
}
export default DashboardHeader;

