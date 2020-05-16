import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

import swapSvg from "./images/converter.svg";

import currencies from "./data/currencies.json";

import CurrencyCard from "./components/CurrencyCard";
import HistorialCard from "./components/HistorialCard";

// let HistoricalCardStyle = {
//   min-height: 100vh!important;
// }

class App extends React.Component {
  render() {
    return (
      <div
        class="container"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgb(0, 159, 221) 0%, rgb(0, 148, 141) 100%)",
        }}
      >
        <div class="row min-vh-100">
          <div class="col mt-3">
            <div class="d-flex flex-column h-100">
              <div class="row">
                <div class="col-12 col-lg-5">
                  <CurrencyCard />
                </div>
                <div class="col-12 col-lg-2 m-auto">
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
                <div class="col-12 col-lg-5">
                  <CurrencyCard />
                </div>
              </div>
              <div class="row flex-grow-1">
                <div class="col mt-3">
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
