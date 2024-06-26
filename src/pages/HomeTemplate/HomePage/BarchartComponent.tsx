import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { DailyReportView } from "./duck/types";

export default function BarChartComponent() {
  const { loading, data } = useSelector(
    (state: RootState) => state.listDailyReportReducer
  );
  const tranformed: DataChart[] = [];
  interface DataChart {
    floor?: string;
    passQty?: number;
    defectQty?: number;
  }

  function fillData() {
    if (data) {
      data.forEach((item: any) => {
        const exist = tranformed?.find(t => t.floor === item.floor);
        if (exist) {
          exist.defectQty += item?.defectQty;
          exist.passQty += item?.passQty;
          
        }
        else {
          tranformed.push({
            floor: item.floor,
            passQty: item.passQty,
            defectQty: item.defectQty,
          });
          
        }
      });
    }
    dataChart?.forEach((item:any) => {
      const exist = tranformed?.find(t => t.floor === item.name);
      if (exist){
        item.defect = exist.defectQty;
        item.pass = exist.passQty;
      }
    });
  }

  const dataChart = [
    {
      name: "Factory A01",
      pass: 0,
      defect: 0,
    },
    {
      name: "Factory A02",
      pass: 0,
      defect: 0,
    },
    {
      name: "Factory C03",
      pass: 0,
      defect: 0,
    },
    {
      name: "Factory B05",
      pass: 0,
      defect: 0,
    },
    {
      name: "Factory B06",
      pass: 0,
      defect: 0,
    },
    {
      name: "Factory C07",
      pass: 0,
      defect: 0,
    },
    {
      name: "Factory A08",
      pass: 0,
      defect: 0,
    },
  ];

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const radius = 10;
    const defectvalue = dataChart[index].pass;
    return (
      <g>
        <div />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#f21262"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {defectvalue}
        </text>
      </g>
    );
  };
  const renderCustomizedLabel2 = (props: any) => {
    const { x, y, width, value, index } = props;
    const radius = 10;
    const defectvalue = dataChart[index].defect;

    return (
      <g>
        <div />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#1253f2"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {defectvalue}
        </text>
      </g>
    );
  };

  return (
    <>
      {fillData()}
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          data={dataChart}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pass" fill="#1253f2" minPointSize={0}>
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="defect" fill="#f21262" minPointSize={0}>
            <LabelList dataKey="name" content={renderCustomizedLabel2} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
