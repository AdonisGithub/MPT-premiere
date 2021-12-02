import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';
// import HorizontalPageProgress from "react-horizontal-page-progress";
// import VideoThumbnail from 'react-video-thumbnail'; 
import "./styles.css";

export default function Success(){
    const [values, setValues] = useState({});
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [exist, setExist] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const refKey = React.useRef(null)
    const refEmail = React.useRef(null)

    const handleChange = event => {
        event.persist();
        setValues(values => ({
          ...values,
          [event.target.name]: event.target.value
        }));
      };
      console.log(values.address);
      console.log(values.email);
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
      
    const handleSubmit =async (e) =>{
        try {
            if (!values.address) {
                return refKey.current.focus()
            }
            if (!/^0x[a-fA-F0-9]{40}$/.test(values.address)) {
                refKey.current.select();
                return refKey.current.focus()
            }
            if (!values.email) {
                return refEmail.current.focus()
            }
            if (!validateEmail(values.email)) {
                refEmail.current.select();
                return refEmail.current.focus()
            }
            
            
            const url = process.env.REACT_APP_PROXY + `/api/add/user`
            const date1 =new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
            console.log(date1)
            const res = await axios.post(url, {
                // values:Customers
                address: values.address,
                email: values.email,
                date: date1,
            })
            const data = res && res.data;
            console.log(values);
            console.log(data);
            if (data && data.status==='ok') {
                setFailed(false);
                setExist(false);
                setSuccess(true);
                setSubmit(true);
            } 
            if (data && data.status==='exist') {
                setSuccess(false);
                setFailed(false);
                setExist(true);
            }
            if (data && data.status==='fail') {
                setSuccess(false);
                setExist(false);
                setFailed(true);
            }
        } catch (err) {
            console.log(err)
            setFailed(true);
        }
    }  
    // const [address, setAddress] = useState('');
    // useEffect(() => {    
    //     const {ethereum} = window;
    //     if(ethereum && window.sessionStorage.getItem("connect")){
    //         handleConnect();
    //     };
    //   }, []);
      
    // const handleConnect =async () =>{
    //     if(!address){
    //         const {ethereum} = window
    //         if (ethereum) {
    //             const chainId =await window.ethereum.request({ method: 'eth_chainId' });
    //             if(Number(chainId) == 56){
    //                 ethereum.request({ method: 'eth_requestAccounts' }).then(accs=>{
    //                     if (accs && accs.length) {
    //                         console.log(process.env.REACT_APP_PROXY + `/api/add/user`);
    //                         axios.post(process.env.REACT_APP_PROXY + `/api/add/user`, { address:accs[0] }).then(res => {
    //                             const data = res && res.data;
    //                             if (data && data.status==='ok') {
    //                                 setAddress(accs[0])
    //                                 window.sessionStorage.setItem("connect", "1")
    //                             } else {
    //                                 alert("failed");
    //                             }
    //                         })
    //                     }
    //                 })
    //             }else{
    //                 alert("please select smart chain network !!!");
    //             }
    //         } else {
    //             alert('🦊 first, install metamask');
    //         }
    //     }
    //   }
    return(
        <div className = "success">
            <div>.</div>
            <div className = "alam">
                <span><img src = "img/alam-warn.webp" width = "30vw" style = {{marginRight:"20px"}} /></span>
                <a className = "alam-text">DO NOT CLOSE OR REFRESH THIS PAGE UNTIL YOU'VE SUCCESSFULLY COMPLETED ALL THE STEPS !</a>
            </div>
            <Grid container>
                <Grid item xs={12} sm = {12} md = {1} lg={2}></Grid>
                <Grid item xs={12} sm = {12} md = {10} lg={8}>
                    <div className = "success-header">
                        <img src = "img/film-logo.png" /> 
                        <span className = "logo-text">Premiere</span>
                    </div>
                    <div className = "success-landing">
                        <div className = "congrats">
                            😁<br />
                            CONGRATULATIONS!<br />
                            YOUR REGISTRATION IS COMPLETE <br />
                            <hr style = {{width:"40%", color:"rgba(255, 255, 255, 0.34)"}} />
                        </div>
                        <div>
                            <div className = "step-text">PLEASE INPUT YOUR INFORMATION TO RECEIVE MBT COINS</div>
                            <div className = "flow-bar"></div>
                            <div className = "alam">
                                <span><img src = "img/tutorial.webp" width = "30vw" style = {{marginRight:"20px"}} /></span>
                                <a href = "/tutorial_how-to-install-metamask-and-add-Binance-smart-chain-and-MBT-coin" target = "_blank" className = "alam-text">PLEASE REFERENCE 3 TUTORIAL GUIDES TO SETUP METAMASK WALLET TO RECEIVE COINS IF YOU NEED HELP</a>
                            </div>
                            <br /><br />
                            <div className = {submit?"hidden":""}>
                                        <div>
                                            <input ref={refKey} className = "address" onChange = {handleChange} value = {values.address || ""} type = "text" name = "address" placeholder = "Enter Your Public Key" required></input>
                                        </div><br />
                                        <div>
                                            <input ref={refEmail} className = "email" onChange = {handleChange} value = {values.email || ""} type = "email" name="email" placeholder = "Enter Your Email Address" required></input>
                                        </div><br />
                                        
                                        <div className = {failed?"result-text2":"hidden"}>Failed Submitting. Please try again</div>
                                        <div className = {exist?"result-text3":"hidden"}>Already exist. Try with another</div><br/>
                                        <div>
                                            <button onClick={handleSubmit} className = "button-1" type="submit">Click to Submit</button>
                                        </div>
                            </div><br />
                            {/* <div className = "connect-button">
                                {address?(
                                    <button className = "connect1" >🦊 {address.toString()}</button>
                                ):(
                                    <button className = "connect" onClick = {handleConnect}>🦊 Connect Metamask Wallet</button>
                                    )
                                }
                            </div> */}
                            <div className = {success?"result-text1":"hidden"}>You have successfully submitted !</div><br/>
                            <div className = "steps"><br/><br/>
                                <div className = "step-fill">
                                    <Grid container>
                                        <Grid item xs={12} sm = {2} md = {2} lg={2}>
                                            <img src = "img/step-4.webp" width = "70%" style = {{marginLeft:'15%'}} />
                                        </Grid>
                                        <Grid item xs={12} sm = {1} md = {1} lg={1}></Grid>
                                        <Grid item xs={12} sm = {9} md = {9} lg={9}>
                                            <div className = "step-sub-title">
                                                <a href = "https://t.me/joinchat/zF2KxNkFrNk4YmE1" target = "_blank">Join the Telegram channel to receive updates</a>
                                            </div><br />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <hr style = {{width:"60%", color:"rgba(255, 255, 255, 0.34)"}} /><br/>
                            <div style = {{color:"white", fontFamily:"Arial", fontSize:"16px", textAlign:"center"}}>We do not share or take sensitive/ personal data. Your Public address is safe to share and we will only use it in your favor.</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm = {12} md = {1} lg={2}></Grid>
            </Grid>
            <div className = "success-footer">
                <div style = {{marginLeft:"20%"}}>© Copyright 2021  - All Rights Reserved</div>
            </div>
        </div>
    );
}