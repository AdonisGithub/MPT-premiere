import React, {useState, useEffect } from "react";
import "./styles.css";
import Success from './success';
const Home = () => {
  const [ok, setOk] = useState(true);
  const options = {
    key: "rzp_live_JOlrGIAoSDme3h",
    currency: "INR",
    receipt: "#1",
    amount: "10000", //  = INR 100
    name: "MoneyBall Token",
    description: "Pay for the Webinar",
    // handle after payment success
    handler: function (response) {
      setOk(true);

    },
    prefill: {
      name: "",
      contact: "",
      email: "",
      address: ""
    },
    notes: {
      address: ""
    },
    theme: {
      color: "#26e3ff",
      hide_topbar: false
    }
  };

  const openPayModal = (options) => {
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", (res) => {
      // handle fail Payment
      console.log("Payment Failed: ", res);
      setOk(false);
    });
    rzp1.open();
  };
  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      setTimeout(()=>{
          openPayModal(options)},1000)
  }, []);

  return (
    <div>
      {ok?
      (
        <Success />
      )
    :(
      <div className = "buttons">
        <div className = "success-header">
                        <img src = "img/film-logo.png" /> 
                        <span className = "logo-text">Premiere</span>
        </div>
        <div className = "text-note">
          <div className = "notice-text">Kindly wait while the payment page loads</div><br />
          <div className = "notice-text">Once your payment is complete do not Refresh or exit the payment success page until you've completed all necessary steps.</div><br />
          <div className = "notice-text">Incase you require any assistance, contact support via mail <span style = {{color:"lightblue"}}>support@cryptodomination101.com</span></div>
        </div>
        <a className = "back-button" href = "https://www.premiere-mbt.com/" blank="_self">
          <img src = "img/return-button.png" width = "100vw" />  
          <b style={{color:"white",marginTop:"20px", display: "block", textAlign:"center"}}>BACK</b>
        </a><br />
        
        
      </div>  
    )
    }
    </div>
  );
};
export default Home;
