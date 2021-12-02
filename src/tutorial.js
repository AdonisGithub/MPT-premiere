import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import axios from 'axios';
// import HorizontalPageProgress from "react-horizontal-page-progress";
// import VideoThumbnail from 'react-video-thumbnail'; 
import "./styles.css";

export default function Tutorial(){
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
            // const Customers = {
            //     address: values.address,
            //     email: values.email
            // }
            const res = await axios.post(url, {
                // values:Customers
                address: values.address,
                email: values.email
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
            <Grid container>
                <Grid item xs={12} sm = {12} md = {1} lg={2}></Grid>
                <Grid item xs={12} sm = {12} md = {10} lg={8}>
                    <div className = "success-header">
                        <img src = "img/film-logo.png" /> 
                        <span className = "logo-text">Premiere</span>
                    </div>
                    <div className = "success-landing">
                        <div className = "congrats">
                            <div>TUTORIALS</div>
                            <hr style = {{width:"40%", color:"rgba(255, 255, 255, 0.34)"}} />
                        </div>
                        <div>
                            <div className = "step-text">HERE ARE YOUR STEPS</div>
                            <div className = "flow-bar"></div>
                            <div className = "steps">
                                <div className = "step-title" id="step-start">STEP 1</div><br/>
                                <div className = "step-fill">
                                    <Grid container>
                                        <Grid item xs={12} sm = {2} md = {2} lg={2}>
                                            <img src = "img/step-1.webp" width = "70%" style = {{marginLeft:'15%'}} />
                                        </Grid>
                                        <Grid item xs={12} sm = {1} md = {1} lg={1}></Grid>
                                        <Grid item xs={12} sm = {9} md = {9} lg={9}>
                                            <div className = "step-sub-title">
                                                <a href = "https://metamask.io/download" target = "_blank">Download The Meta Mask Wallet</a>
                                            </div><br />
                                            <div className = "step-sub-comment">
                                                <a href = "https://metamask.io/download" target = "_blank">DOWNLOAD META MASK</a>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div className = "video">
                                        <video width="80%" height="600px" controls>
                                            <source src="video/step-1.mp4" type="video/mp4" />
                                        </video>
                                        <div className = "thumbnail" style = {open?{display: "none"}:null}>
                                            <img src = "img/thumbnail.png" width = "100vw" onClick = {()=>setOpen(true)}/>                                      
                                        </div>
                                    </div><br/>
                                    <div style={{textAlign:"center"}}>
                                        <span><img src = "img/exclam.png" width = "20vw" /> </span>
                                        <span className = "warn-text">Watch this tutorial and follow all the steps as directed!</span>
                                    </div>
                                </div>
                            </div>
                            <div className = "steps">
                                <div className = "step-title">STEP 2</div><br/><br/>
                                <div className = "step-fill">
                                    <Grid container>
                                        <Grid item xs={12} sm = {2} md = {2} lg={2}>
                                            <img src = "img/step-2.webp" width = "70%" style = {{marginLeft:'15%'}} />
                                        </Grid>
                                        <Grid item xs={12} sm = {1} md = {1} lg={1}></Grid>
                                        <Grid item xs={12} sm = {9} md = {9} lg={9}>
                                            <div className = "step-sub-title">Add the BSC Network</div><br />
                                            <div className = "step-sub-comment">
                                                <a href = "https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain.amp" target = "_blank">Read more about the BSC Network</a>
                                                <br/><br/>
                                                Network Name:<b> Smart Chain</b><br/>
                                                <a href = "https://bsc-dataseed.binance.org/" target = "_blank">New RPC URL:<b> https://bsc-dataseed.binance.org/</b></a><br/>
                                                ChainID:<b> 56</b><br/>
                                                Symbol:<b> BNB</b><br/>
                                                <a href = "https://bscscan.com" target = "_blank">Block Explorer URL:<b> https://bscscan.com</b></a><br/><br/><br/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div className = "video">
                                        <video width="80%" height="600px" controls>
                                            <source src="video/step-2.mp4" type="video/mp4" />
                                        </video>
                                        <div className = "thumbnail" style = {open1?{display: "none"}:null}>
                                            <img src = "img/thumbnail.png" width = "100vw" onClick = {()=>setOpen1(true)}/>                                      
                                        </div>
                                    </div><br/>
                                    <div style={{textAlign:"center"}}>
                                        <span><img src = "img/exclam.png" width = "20vw" /> </span>
                                        <span className = "warn-text">Watch this tutorial and follow all the steps as directed!</span>
                                    </div>
                                </div>
                            </div>
                            <div className = "steps">
                                <div className = "step-title">STEP 3</div><br/>
                                <div className = "step-fill">
                                    <Grid container>
                                        <Grid item xs={12} sm = {2} md = {2} lg={2}>
                                            <img src = "img/step-3.webp" width = "70%" style = {{marginLeft:'15%'}} />
                                        </Grid>
                                        <Grid item xs={12} sm = {1} md = {1} lg={1}></Grid>
                                        <Grid item xs={12} sm = {9} md = {9} lg={9}>
                                            <div className = "step-sub-title">Add MoneyBall Token</div><br />
                                            <div className = "step-sub-comment">
                                                Token Address:<b> 0x8d7d20bc3be644eaab3239e3a5aa9158b84912ed</b><br/>
                                                Token Symbol:<b> MBT</b><br/>
                                                Token of precision:<b> 18</b><br/>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <div className = "video">
                                        <video width="80%" height="600px" controls>
                                            <source src="video/step-3.mp4" type="video/mp4" />
                                        </video>
                                        <div className = "thumbnail" style = {open2?{display: "none"}:null}>
                                            <img src = "img/thumbnail.png" width = "100vw" onClick = {()=>setOpen2(true)}/>                                      
                                        </div>
                                    </div><br/>
                                    <div style={{textAlign:"center"}}>
                                        <span><img src = "img/exclam.png" width = "20vw" /> </span>
                                        <span className = "warn-text">Watch this tutorial and follow all the steps as directed!</span>
                                    </div>
                                </div>
                            </div><br /><br />
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