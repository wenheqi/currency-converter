import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import currencies from "./data/currencies.json";

class App extends React.Component {
  render() {
    return (
      <Container>
        {currencies.map((currency) => {
          return (
            <Row>
              <Col>
                <img
                  alt={currency.locale}
                  src={
                    "https://www.countryflags.io/" +
                    currency.flag_name +
                    "/shiny/64.png"
                  }
                ></img>
              </Col>
              <Col>{currency.locale}</Col>
              <Col>{currency.currency_code}</Col>
              <Col>{currency.currency_name}</Col>
              <Col>{currency.currency_name_short}</Col>
              <Col>{currency.display_unicode}</Col>
            </Row>
          );
        })}
      </Container>
    );
  }
}

export default App;
