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

  const sendSrcCodeToParent = (code) => {
    setSrcCode(code);
  };

  const sendDstCodeToParent = (code) => {
    setDstCode(code);
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
                <CurrencyCard srcCode={srcCode} dstCode={dstCode} />
              </div>
              <div className="col-12 col-lg-2 m-auto">
                <img
                  className="img-fluid d-block mx-auto p-4 p-lg-0 w-25"
                  src={swapSvg}
                  alt="swap"
                ></img>
              </div>
              <div className="col-12 col-lg-5">
                <CurrencyCard srcCode={dstCode} dstCode={srcCode} />
              </div>
            </div>
            <div className="row flex-grow-1">
              <div className="col mt-3">
                <HistorialCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
