import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./CurrencyCard.css";

import currencies from "../data/currencies";

function CurrencyCard({ srcCode, dstCode, sendCodeToParent }) {
  function loadCurrenciesJson() {
    let tmpJson = {};
    currencies.forEach((currency) => {
      tmpJson[currency.currency_code] = currency;
    });
    return tmpJson;
  }

  const [currenciesJson] = useState(loadCurrenciesJson());
  const [src, setSrc] = useState(srcCode);
  const [dst, setDst] = useState(dstCode);
  const [exchangeRate, setExchangeRate] = useState({ rates: {} });

  useEffect(() => {
    fetch(
      "https://api.exchangeratesapi.io/latest?symbols=" + dst + "&base=" + src
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExchangeRate(result);
      });
  }, [src, dst]);

  useEffect(() => {
    setDst(dstCode);
  }, [dstCode]);

  useEffect(() => {
    setSrc(srcCode);
  }, [srcCode]);

  const handleSelectOptionChange = (e) => {
    console.log("handleSelectOptionChange is called");
    setSrc(e.target.value);
    sendCodeToParent(e.target.value);
  };

  const handleInputChange = (e) => {
    console.log("handleInputChange is called");
  };

  return (
    <Card className="h-100 shadow-sm rounded">
      <Card.Header className="bg-white">
        <select
          className="form-control col-xs-3"
          onChange={handleSelectOptionChange}
          value={src}
        >
          {currencies.map((currency) => {
            return (
              <option
                key={currency.currency_code}
                // selected={src == currency.currency_code ? true : false}
              >
                {currency.currency_code}
              </option>
            );
          })}
        </select>
      </Card.Header>
      <Card.Body>
        <Card.Title>{currenciesJson[src].currency_name}</Card.Title>
        {/* <Card.Subtitle>{currenciesJson[src].display_unicode}</Card.Subtitle> */}
        <Card.Subtitle>
          1 {src} = {exchangeRate.rates[dst]} {dst}
        </Card.Subtitle>
        <Row>
          <Col sm={3}>
            <img
              alt="flag of United States"
              src={
                "https://www.countryflags.io/" +
                currenciesJson[src].flag_name +
                "/shiny/64.png"
              }
            />
          </Col>
          <Col sm={9}>
            <input
              type="number"
              title="Please enter a number, e.g. 123.987."
              onChange={handleInputChange}
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
