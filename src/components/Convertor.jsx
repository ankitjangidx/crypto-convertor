import { Card, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { BsCurrencyExchange } from "react-icons/bs";
import "./Convertor.css";

const Convertor = () => {
  const apiurl = "https://api.coingecko.com/api/v3/exchange_rates";
  const defaultfirst = "Bitcoin";
  const defaultsecond = "Ether";
  const [cryptolist, setcryptolist] = useState([]);
  const [inputvalue, setinputvalue] = useState("0");
  const [firstselect, setfirstselect] = useState(defaultfirst);
  const [secondselect, setsecondselect] = useState(defaultsecond);
  const [result, setresult] = useState("0.000000");

  useEffect(() => {
    fetchdata();
  }, []);
  async function fetchdata() {
    const response = await fetch(apiurl);
    const jsondata = await response.json();
    const data = jsondata.rates;

    const Temparr = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });
    setcryptolist(Temparr);
  }
  useEffect(() => {
    if (cryptolist.length === 0) return;
    const firstselectrate = cryptolist.find((item) => {
      return item.value === firstselect;
    }).rate;
    const secondselectrate = cryptolist.find((item) => {
      return item.value === secondselect;
    }).rate;
    const resultrate = (inputvalue * secondselectrate) / firstselectrate;
    setresult(resultrate.toFixed(6));
  }, [inputvalue, firstselect, secondselect]);

  return (
    <>
      <div className="container">
        <Card
          className="crypto-card"
          title={
            <h1 className="icon">
              <BsCurrencyExchange />
              Crypto Convertor
            </h1>
          }
        >
          <Form>
            <Form.Item>
              <Input
                allowClear="true"
                bordered="true"
                onChange={(e) => {
                  setinputvalue(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
          <div className="select-box">
            <Select
              showSearch="true"
              style={{ width: 160 }}
              defaultValue={defaultfirst}
              options={cryptolist}
              onChange={(value) => {
                setfirstselect(value);
              }}
            />
            <Select
              showSearch="true"
              style={{ width: 160 }}
              defaultValue={defaultsecond}
              options={cryptolist}
              onChange={(value) => {
                setsecondselect(value);
              }}
            />
          </div>
          <p style={{ marginTop: "20px" }}>
            {inputvalue}&nbsp;{firstselect}&nbsp;=&nbsp;{result}&nbsp;
            {secondselect}
          </p>
        </Card>
      </div>
    </>
  );
};

export default Convertor;
