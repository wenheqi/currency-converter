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

// const data = [
//   { name: "AED", rate: 3.97467 },
//   { name: "AFN", rate: 83.005989 },
//   { name: "ALL", rate: 123.366634 },
//   { name: "AMD", rate: 527.975462 },
//   { name: "ANG", rate: 1.941971 },
//   { name: "AOA", rate: 603.731679 },
//   { name: "ARS", rate: 73.193491 },
//   { name: "AUD", rate: 1.687 },
//   { name: "AWG", rate: 1.947888 },
//   { name: "AZN", rate: 1.843968 },
//   { name: "BAM", rate: 1.957295 },

//   { name: "AED", rate: 3.97467 },
//   { name: "AFN", rate: 83.005989 },
//   { name: "ALL", rate: 123.366634 },
//   { name: "AMD", rate: 527.975462 },
//   { name: "ANG", rate: 1.941971 },
//   { name: "AOA", rate: 603.731679 },
//   { name: "ARS", rate: 73.193491 },
//   { name: "AUD", rate: 1.687 },
//   { name: "AWG", rate: 1.947888 },
//   { name: "AZN", rate: 1.843968 },
//   { name: "BAM", rate: 1.957295 },

//   { name: "AED", rate: 3.97467 },
//   { name: "AFN", rate: 83.005989 },
//   { name: "ALL", rate: 123.366634 },
//   { name: "AMD", rate: 527.975462 },
//   { name: "ANG", rate: 1.941971 },
//   { name: "AOA", rate: 603.731679 },
//   { name: "ARS", rate: 73.193491 },
//   { name: "AUD", rate: 1.687 },
//   { name: "AWG", rate: 1.947888 },
//   { name: "AZN", rate: 1.843968 },
//   { name: "BAM", rate: 1.957295 },
// ];

export default function HistorialCard({ src, dst }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("useEffect in Historical card is called");
    fetch(
      "http://data.fixer.io/api/2020-05-16?access_key=7d8d9e998e00341ea569445f3215f0a0"
    )
      .then((res) => res.json())
      .then((json) => json.rates)
      .then((json) => {
        let tmpData = [];
        Object.keys(json).forEach((key) => {
          if (key !== src) {
            let tmpJson = { name: key, rate: json[key] / json[src] };
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
        <Bar dataKey="rate" fill="#31aefa" />
      </BarChart>
    </ResponsiveContainer>
  );
}
