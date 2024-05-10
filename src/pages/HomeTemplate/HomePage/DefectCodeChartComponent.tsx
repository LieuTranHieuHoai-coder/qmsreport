import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function DefectCodeChartComponent() {
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "red",
    "pink",
    "#1DE9B6",
    "#004D40",
    "#1A237E",
    "#00B0FF",
    "#FF1744",
    "#66BB6A",
    "#E91E63",
    "#FFAB00",
    "#1A237E",
    "#FFBB28",
    "#FF8042",
    "#43A047",
    "#00E5FF",
  ];

  const { loading, data } = useSelector(
    (state: RootState) => state.chartDefectCodeReducer
  );
  const tranformed: DataChart[] = [];
  interface DataChart {
    defineCode?: string;
    total?: number;
  }

  function fillData() {
    if (data) {
      data.forEach((item: any) => {
        const exist = tranformed?.find(
          (t: any) => t.defineCode === item.defineCode
        );
        if (exist) {
          exist.total += item.total;
        } else {
          tranformed.push({
            defineCode: item.defineCode,
            total: parseInt(item.total),
          });
        }
      });
    }
    tranformed.sort((a: any, b: any) =>
      parseInt(a.defineCode) > parseInt(b.defineCode) ? 1 : -1
    );
    console.log(tranformed.sort());
  }
  const getPath = (x: any, y: any, width: any, height: any) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x - 5 + width / 2
    },${y + height / 3}
    ${x  + width / 2}, ${y}
    C${x + 5 + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <>
      {fillData()}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={tranformed}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="defineCode" />
          <YAxis />
          <Bar
            dataKey="total"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {tranformed.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
