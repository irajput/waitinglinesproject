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

function Chart() {
    //const [posts, setPosts] = useState([]);
    let restaur = String(sessionStorage.getItem('restaurant'));
    let predictor = [1,2,3,4,5]
    if (sessionStorage.getItem('preds') !== null) {
        console.log(JSON.parse(sessionStorage.getItem('preds')))
        predictor = JSON.parse(sessionStorage.getItem('preds'))
    }
    //let predictis = JSON.parse(sessionStorage.getItem('preds'));
    //console.log("Hi" + predictis)
    //const predurl1 = "http://localhost:3001/prediction?restaurant="
    //const predurl =  predurl1.concat(restaur)
    //console.log(predurl)
    //setPosts(mpreds.data);
    /*console.log(mpreds)
    sessionStorage.setItem('preds', JSON.stringify(mpreds.response));
    let predicts = sessionStorage.getItem('preds')*/
    //let predicts = sessionStorage.getItem('preds');
    //console.log("Hi" + predicts)
    return (
        <>
            <h1 className="text-heading">
                Predictions for {restaur}
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={predictor} margin={{ right: 300 }}>
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