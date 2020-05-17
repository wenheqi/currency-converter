import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./CurrencyCard.css";

import currencies from "../data/currencies";

function CurrencyCard({
  srcCode,
  dstCode,
  sendCodeToParent,
  amountInEuro,
  sendAmountInEuroToParent,
}) {
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
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch(
      // "http://data.fixer.io/api/latest?access_key=7d8d9e998e00341ea569445f3215f0a0&symbols=" +
      //   dst +
      //   "," +
      //   src
      "https://api.exchangerate-api.com/v4/latest/euro"
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

  useEffect(() => {
    let tmpAmount = amountInEuro * exchangeRate.rates[src];
    // console.log("tmpAmount is " + tmpAmount);
    if (Math.abs(tmpAmount - amount) > 0.00001) {
      tmpAmount = Number.parseFloat(tmpAmount.toFixed(5));
      setAmount(tmpAmount);
    }
  }, [amountInEuro, src, dst, exchangeRate]);

  const handleSelectOptionChange = (e) => {
    // console.log("handleSelectOptionChange is called");
    setSrc(e.target.value);
    sendCodeToParent(e.target.value);
  };

  const handleInputChange = (e) => {
    // console.log("EUR is " + e.target.value / exchangeRate.rates[src]);
    setAmount(e.target.value);
    sendAmountInEuroToParent(e.target.value / exchangeRate.rates[src]);
  };

  const displayDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toUTCString();
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
          1 {src} ={" "}
          {Number.parseFloat(
            (exchangeRate.rates[dst] * 1.0) / exchangeRate.rates[src]
          ).toFixed(5)}{" "}
          {dst}
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
              value={amount}
              onChange={handleInputChange}
              className="h-100 w-100 text-right border-top-0 border-left-0 border-right-0 fs-xlg"
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <span className="fs-sm">
              Last update:{" "}
              {/* {displayDate(Number.parseInt(exchangeRate.timestamp) * 1000)} */}
              {displayDate(
                Number.parseInt(exchangeRate.time_last_updated) * 1000
              )}
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CurrencyCard;
