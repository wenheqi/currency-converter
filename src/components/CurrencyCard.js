import React, { Component } from "react";
import { Card, Button, ListGroup, Dropdown, Row, Col } from "react-bootstrap";
import "./CurrencyCard.css";

class CurrencyCard extends Component {
  render() {
    return (
      <Card className="h-100 shadow-sm rounded">
        <Card.Header className="bg-white">
          <select className="form-control col-xs-3">
            <option>USD</option>
            <option>AED</option>
            <option>CNY</option>
          </select>
        </Card.Header>
        <Card.Body>
          <Card.Title>United States Dollars</Card.Title>
          <Card.Subtitle>$</Card.Subtitle>
          <Row>
            <Col sm={3}>
              <img
                alt="flag of United States"
                src="https://www.countryflags.io/us/shiny/64.png"
              />
            </Col>
            <Col sm={9}>
              <input
                type="number"
                title="Please enter a number, e.g. 123.987."
                className="h-100 w-100 text-right border-top-0 border-left-0 border-right-0 fs-xlg"
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <span className="fs-sm">
                Last update: 12:00:00 pm 05/15/2020 PDT
              </span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default CurrencyCard;
