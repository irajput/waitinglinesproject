import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

function Chart() {
    predicts = sessionStorage.getItem('preds')
    restaur = sessionStorage.getItem('restaurant')
    return (
        <>
            <h1 className="text-heading">
                Predictions for ${restaur}
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={predicts} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey="name" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="Predicted Wait Time"
                        stroke="black" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
  
export default Chart;