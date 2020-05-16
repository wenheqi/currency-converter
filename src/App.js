import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import swapSvg from "./images/converter.svg";

import CurrencyCard from "./components/CurrencyCard";
import HistorialCard from "./components/HistorialCard";

// let HistoricalCardStyle = {
//   min-height: 100vh!important;
// }

class App extends React.Component {
  render() {
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
                  <CurrencyCard code="USD" />
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
                      className="img-fluid d-block mx-auto p-4 p-lg-0 w-25"
                      src={swapSvg}
                      alt="swap"
                    ></img>
                  </OverlayTrigger>
                </div>
                <div className="col-12 col-lg-5">
                  <CurrencyCard code="USD" />
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
}

export default App;
