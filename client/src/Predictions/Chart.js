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

async function Chart() {
    //const [posts, setPosts] = useState([]);
    let restaur = String(sessionStorage.getItem('restaurant'));
    console.log(restaur)
    const predurl1 = "http://localhost:3001/prediction?resturant="
    const predurl =  predurl1.concat(restaur)
    console.log(predurl)
        
    let mpreds =  await fetch(predurl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    //setPosts(mpreds.data);
    //console.log(posts)
    sessionStorage.setItem('preds', JSON.stringify(mpreds.data));
    let predicts = JSON.parse(sessionStorage.getItem('preds'))
    console.log("Hi" + predicts)
    return (
        <>
            <h1 className="text-heading">
                Predictions for {restaur}
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