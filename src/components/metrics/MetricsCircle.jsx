import { p } from "framer-motion/client";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import TrophyIcon from "../../assets/icons/Trophy.png";

const data = [
  { name: "Vendedor 1", value: 150 },
  { name: "Vendedor 2", value: 100 },
  { name: "Vendedor 3", value: 200 },
  { name: "Vendedor 4", value: 400 },
];
const COLORS = ["#4071D1", "#E03030", "#F09393", "#F7CCCC"];

const MetricsCircle = ({ dataArray = [], width = 800 }) => {
  const newData = dataArray.map((item) => ({
    name: item.fullName,
    value: Number(item.total),
  }));
  const total = newData.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = newData.map((item) => ({
    ...item,
    percent: ((item.value / total) * 100).toFixed(2),
  }));

  const sortedDataWithPercentages = [...dataWithPercentages].sort(
    (a, b) => b.value - a.value,
  );
  return (
    <div className="relative">
      <PieChart width={width} height={200}>
        <Legend layout="vertical" verticalAlign="middle" align="center" />
        <Tooltip />

        <Pie
          data={sortedDataWithPercentages}
          cx={120}
          cy={"50%"}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {sortedDataWithPercentages.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              radius={[0, 0, 10, 10]}
            />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute right-16 top-[26%]">
        {sortedDataWithPercentages.map((data, index) => (
          <div key={index} className="flex items-center justify-center gap-1">
            <img
              alt={TrophyIcon}
              src={TrophyIcon}
              className={`${index === 0 ? "visible" : "invisible"} h-4 w-4`}
            />
            <p>{data.percent} %</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsCircle;
