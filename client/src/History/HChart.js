import React, {useState, useEffect} from "react"
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

function HChart() {
    //const [posts, setPosts] = useState([]);
    let restaur = String(sessionStorage.getItem('restaurantt'));
    let predictor = [1,2,3,4,5]
    console.log("Hi" + JSON.parse(sessionStorage.getItem('hist')))
    if (sessionStorage.getItem('preds') !== null) {
        console.log(JSON.parse(sessionStorage.getItem('hist')))
        predictor = JSON.parse(sessionStorage.getItem('hist'))
    }
    console.log(JSON.parse(sessionStorage.getItem('hist')))
    let getX = (x) => {
        //console.log(x[0]); 
        let w = x[0]/60000;
        let m = w%60;
        let h = Math.floor(w/60);
        let s = h + ":" + m;
        return s;
    };;
    let getY = (x) => { return x[1]};
    return (
        <>
            <h1 className="text-heading">
                Predictions for {restaur}
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={predictor} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey={getX} 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey={getY}
                        stroke="black" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
  
export default HChart;