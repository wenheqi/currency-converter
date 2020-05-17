import React, { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function HistorialCard({ src, dst }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useEffect in Historical card is called");
    fetch(
      // "http://data.fixer.io/api/latest?access_key=7d8d9e998e00341ea569445f3215f0a0"
      "https://api.exchangerate-api.com/v4/latest/euro"
    )
      .then((res) => res.json())
      .then((json) => json.rates)
      .then((json) => {
        let tmpData = [];
        Object.keys(json).forEach((key) => {
          if (key !== src && key !== dst) {
            let tmpJson = {
              name: key,
              rate: Number.parseFloat(json[key] / json[src]).toFixed(5),
            };
            tmpData.push(tmpJson);
          }
        });
        setData(tmpData);
      });
    console.log(data);
  }, [src, dst]);

  return (
    <ResponsiveContainer width="100%">
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rate" fill="#ebc135" />
      </BarChart>
    </ResponsiveContainer>
  );
}
