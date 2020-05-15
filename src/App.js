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
      <Container>
        <Row className="mt-3">
          <Col sm={12} lg={5}>
            <CurrencyCard />
          </Col>
          <Col sm={12} lg={2} className="m-auto">
            <OverlayTrigger
              key="tooltip-key-swap"
              placement="top"
              overlay={<Tooltip id="tooltip-swap3">Swap currencies</Tooltip>}
            >
              <img
                className="img-fluid d-block mx-auto p-sm-2 p-lg-0 w-25"
                src={swapSvg}
                alt="swap"
              ></img>
            </OverlayTrigger>
          </Col>
          <Col sm={12} lg={5}>
            <CurrencyCard />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="min-vh-100">
            <HistorialCard />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
