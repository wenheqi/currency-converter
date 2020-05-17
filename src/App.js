import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import swapSvg from "./images/converter.svg";

import CurrencyCard from "./components/CurrencyCard";
import HistorialCard from "./components/HistorialCard";

function App() {
  const [srcCode, setSrcCode] = useState("USD");
  const [dstCode, setDstCode] = useState("HKD");
  const [amountInEuro, setAmountInEuro] = useState(0);
  const [rotation, setRotation] = useState(0);

  const sendSrcCodeToParent = (code) => {
    setSrcCode(code);
  };

  const sendDstCodeToParent = (code) => {
    setDstCode(code);
  };

  const sendAmountInEuroToParent = (amount) => {
    setAmountInEuro(amount);
  };

  const swap = (e) => {
    setRotation(rotation == 0 ? 360 : 0);
    let tmpSrc = srcCode;
    let tmpDst = dstCode;
    setSrcCode(tmpDst);
    setDstCode(tmpSrc);
    console.log(e);
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgb(0, 159, 221) 0%, rgb(0, 148, 141) 100%)",
      }}
    >
      <div className="row min-vh-100">
        <div className="col mt-3">
          <div className="d-flex flex-column h-100">
            <div className="row">
              <div className="col-12 col-lg-5">
                <CurrencyCard
                  srcCode={srcCode}
                  dstCode={dstCode}
                  sendCodeToParent={sendSrcCodeToParent}
                  amountInEuro={amountInEuro}
                  sendAmountInEuroToParent={sendAmountInEuroToParent}
                />
              </div>
              <div className="col-12 col-lg-2 m-auto">
                <OverlayTrigger
                  key="tooltip-key-swap"
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-swap3">Swap currencies</Tooltip>
                  }
                >
                  <img
                    className="img-fluid d-block mx-auto p-4 p-lg-0 w-25 swap"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    src={swapSvg}
                    alt="swap"
                    onClick={swap}
                  ></img>
                </OverlayTrigger>
              </div>
              <div className="col-12 col-lg-5">
                <CurrencyCard
                  srcCode={dstCode}
                  dstCode={srcCode}
                  sendCodeToParent={sendDstCodeToParent}
                  amountInEuro={amountInEuro}
                  sendAmountInEuroToParent={sendAmountInEuroToParent}
                />
              </div>
            </div>
            <div className="row flex-grow-1">
              <div className="col mt-3">
                <HistorialCard src={srcCode} dst={dstCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
