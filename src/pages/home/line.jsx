import React, { Component } from "react";
import { Chart, Path } from "bizcharts";

export default class Line extends Component {
  render() {
    const data = [
      {
        year: "1月",
        sales: 38,
      },
      {
        year: "2月",
        sales: 52,
      },
      {
        year: "3月",
        sales: 61,
      },
      {
        year: "4月",
        sales: 80,
      },
      {
        year: "5月",
        sales: 48,
      },
      {
        year: "6月",
        sales: 90,
      },
      {
        year: "7月",
        sales: 58,
      },
      {
        year: "8月",
        sales: 78,
      },
      {
        year: "9月",
        sales: 95,
      },
      {
        year: "10月",
        sales: 80,
      },
      {
        year: "11月",
        sales: 100,
      },
      {
        year: "12月",
        sales: 140,
      },
    ];
    const scale = {
      sales: {
        min: 0,
        max: 150,
      },
      year: {},
    };

    return (
      <div style={{ width: 700, height: 300 }}>
        <Chart height={300} autoFit data={data} scale={scale} forcefit>
          <Path
            animate={{
              appear: {
                animation: "path-in",
                duration: 1000,
                easing: "easeLinear",
              },
            }}
            shape="smooth"
            position="year*sales"
          />
        </Chart>
      </div>
    );
  }
}
