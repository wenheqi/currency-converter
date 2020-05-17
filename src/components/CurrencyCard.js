import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./CurrencyCard.css";

import currencies from "../data/currencies";

function CurrencyCard({ srcCode, dstCode, amount }) {
  function loadCurrenciesJson() {
    let tmpJson = {};
    currencies.forEach((currency) => {
      tmpJson[currency.currency_code] = currency;
    });
    return tmpJson;
  }

  const [currenciesJson] = useState(loadCurrenciesJson());
  const [exchangeCode, setExchangeCode] = useState(srcCode);
  const [targetCode, setTargetCode] = useState(dstCode);
  const [exchangeRate, setExchangeRate] = useState({ rates: {} });
  const [exchangeAmount, setExchangeAmount] = useState(amount);

  const handleChange = (e) => {
    setExchangeCode(e.target.value);
  };

  useEffect(() => {
    fetch(
      "https://api.exchangeratesapi.io/latest?symbols=" +
        targetCode +
        "&base=" +
        exchangeCode
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExchangeRate(result);
      });
  }, [exchangeCode, srcCode]);

  function changeSelect(event) {
    setExchangeCode(event.target.value);
  }

  return (
    <Card className="h-100 shadow-sm rounded">
      <Card.Header className="bg-white">
        <select
          className="form-control col-xs-3"
          onChange={changeSelect}
          value={exchangeCode}
        >
          {currencies.map((currency) => {
            return (
              <option key={currency.currency_code}>
                {currency.currency_code}
              </option>
            );
          })}
        </select>
      </Card.Header>
      <Card.Body>
        <Card.Title>{currenciesJson[exchangeCode].currency_name}</Card.Title>
        <Card.Subtitle>
          {currenciesJson[exchangeCode].display_unicode}
        </Card.Subtitle>
        <Row>
          <Col sm={3}>
            <img
              alt="flag of United States"
              src={
                "https://www.countryflags.io/" +
                currenciesJson[exchangeCode].flag_name +
                "/shiny/64.png"
              }
            />
          </Col>
          <Col sm={9}>
            <input
              type="number"
              title="Please enter a number, e.g. 123.987."
              value={amount}
              onChange={handleChange}
              className="h-100 w-100 text-right border-top-0 border-left-0 border-right-0 fs-xlg"
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <span className="fs-sm">Last update: {exchangeRate.date}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CurrencyCard;
