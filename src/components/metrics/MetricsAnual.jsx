import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ContentColor from "../colors/ContentColor";

const trasnformName = (number) => {
  switch (number) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Abril";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Diciembre";
    default:
      break;
  }
};

function getFirstThreeLetters(str) {
  return str.slice(0, 3);
}

const dataArray = ({ data = [] }) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return months.map((month) => {
    const monthData = data.find((mes) => mes.month === month);

    if (monthData) {
      return {
        number: month,
        name: trasnformName(month),
        p1: monthData?.products[0]?.total || 0,
        p2: monthData?.products[1]?.total || 0,
        p3: monthData?.products[2]?.total || 0,
        month: getFirstThreeLetters(trasnformName(month)),
      };
    } else {
      return {
        number: month,
        name: trasnformName(month),
        p1: 0,
        p2: 0,
        p3: 0,
        month: getFirstThreeLetters(trasnformName(month)),
      };
    }
  });
};

const MetricsAnual = ({ dataApi = [] }) => {
  const newData = dataArray({ data: dataApi });
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const nameMes = newData.find((m) => m.month === label);
      const mess = dataApi.find((m) => m.month === nameMes.number);
      if (mess) {
        return (
          <div className="custom-tooltip rounded-md border border-gray bg-white p-4">
            <div className="label text-center font-medium">{`${nameMes.name}`}</div>
            <div className="intro flex items-center gap-1 text-xs">
              <ContentColor color={1} />
              {`${mess.products[0]?.productName || "No registra"} : ${mess.products[0]?.total || "0"} unds`}
            </div>
            <div className="intro flex items-center gap-1 text-xs">
              <ContentColor color={2} />
              {`${mess.products[1]?.productName || "No registra"} : ${mess.products[1]?.total || "0"} unds`}
            </div>
            <div className="intro flex items-center gap-1 text-xs">
              <ContentColor color={3} />
              {`${mess.products[2]?.productName || "No registra"} : ${mess.products[2]?.total || "0"} unds`}
            </div>
            <div className="label text-xs font-medium">{`Total: ${
              Number(payload[0].value) +
              Number(payload[1].value) +
              Number(payload[2].value)
            } unds`}</div>
          </div>
        );
      } else {
        return (
          <div className="custom-tooltip w-[15rem] rounded-md border border-gray bg-white p-4 text-center">
            <div className="label font-medium">{`${nameMes.name}`}</div>
            <div className="text-sm">{`Sin registros disponibles para el mes.`}</div>
          </div>
        );
      }
    }

    return null;
  };
  return (
    <div className="h-[13.8rem] w-full rounded-[0.875rem] bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          height={200}
          data={newData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={28}
        >
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="p1" stackId="1" fill="#F7CCCC" radius={[0, 0, 8, 8]} />
          <Bar dataKey="p2" stackId="1" fill="#F09393" />
          <Bar dataKey="p3" stackId="1" fill="#E46666" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsAnual;
