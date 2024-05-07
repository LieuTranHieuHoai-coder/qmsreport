import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

type Props = {
  valuePie: PieData[];
};

type PieData = {
  id?: number;
  name: string;
  value: number;
};
const CustomColor: string[] = ["#1253f2", "#f21262"];
// const data: PieData[] = [
//   { name: "Pass", value: 400 },
//   { name: "Defect", value: 300 },
// ];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 12;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g >
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={20} fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

export default function PieChartComponent(props: Props) {
  const { valuePie } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <>
      <PieChart height={300} width={500}
        >
          <Pie
            key={valuePie
              .map((value) => `${value.name}-${value.value}`)
              .join(",")}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={valuePie}
            cx={150}
            cy={150}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            style={{transform: "translate(30%) !important"}}
          >
            {valuePie.map((entry, index) => (
              <Cell fill={CustomColor[index % CustomColor.length]} />
            ))}
          </Pie>
        </PieChart>
    </>
  );
}
