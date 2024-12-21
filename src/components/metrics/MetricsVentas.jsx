import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const MetricsVentas = ({ apiData = [] }) => {
  const daysWithOrders = apiData.reduce((acc, { day, orders }) => {
    const dayOfMonth = parseInt(day.split("/")[0], 10); // Extrae el día del mes.
    acc[dayOfMonth] = orders; // Guarda el número de órdenes.
    return acc;
  }, {});

  // Generar el array con datos para todos los días del mes.
  const transformedData = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    return {
      day,
      ventas: daysWithOrders[day] || 0, // Si no hay datos para el día, asigna 0.
    };
  });

   return (
     <div className="w-full rounded-[0.875rem] bg-white p-3">
       <ResponsiveContainer width="100%" height={200}>
         <AreaChart
           height={200}
           data={transformedData}
           syncId="anyId"
           margin={{
             top: 10,
             right: 30,
             left: 0,
             bottom: 0,
           }}
         >
           <defs>
             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="#81ACFF" stopOpacity={1} />
               <stop offset="100%" stopColor="#81ACFF" stopOpacity={0} />
             </linearGradient>
           </defs>
           <CartesianGrid
             strokeDasharray="3 3"
             strokeOpacity={0.5}
             vertical={false}
           />
           <XAxis dataKey="day" tickLine={false} axisLine={false} />
           <YAxis
             tickLine={false}
             domain={[
               Math.floor(Math.min(...transformedData.map((d) => d.ventas))),
               Math.ceil(
                 Math.max(...transformedData.map((d) => d.ventas)) +
                   transformedData.ventas >
                   0
                   ? 1
                   : 4,
               ),
             ]}
             tickFormatter={(tick) => Math.round(tick)}
           />
           <Tooltip />
           <Area
             type="monotone"
             dataKey="ventas"
             stroke="#81ACFF"
             fill="url(#colorUv)"
             strokeWidth={2}
           />
         </AreaChart>
       </ResponsiveContainer>
     </div>
   );
};

export default MetricsVentas;
