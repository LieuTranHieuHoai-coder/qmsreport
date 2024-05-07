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
import { RootState } from "../../../../store";
import { DailyReportView } from "./duck/types";

export default function BarChartComponent() {
  const { loading, data } = useSelector(
    (state: RootState) => state.listDailyReportReducer
  );
  const tranformed: DataChart[] = [];
  interface DataChart {
    sewingLine?: string;
    passQty?: number;
    defectQty?: number;
  }

  function fillData() {
    if (data) {
      data.forEach((item: any) => {
        const exist = tranformed?.find(t => t.sewingLine === item.sewingLine);
        if (exist) {
          exist.defectQty += item?.defectQty;
          exist.passQty += item?.passQty;
          
        }
        else {
          tranformed.push({
            sewingLine: item.sewingLine,
            passQty: item.passQty,
            defectQty: item.defectQty,
          });
          
        }
      });
    }

  }


  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const radius = 10;
    const defectvalue = tranformed[index].passQty;
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
    const defectvalue = tranformed[index].defectQty;

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
          data={tranformed}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="sewingLine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="passQty" fill="#1253f2" minPointSize={5}>
            <LabelList dataKey="sewingLine" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="defectQty" fill="#f21262" minPointSize={10}>
            <LabelList dataKey="sewingLine" content={renderCustomizedLabel2} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
