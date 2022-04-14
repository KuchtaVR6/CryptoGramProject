import React from 'react'
import {RadialBarChart, RadialBar, Tooltip} from 'recharts'
import {useEffect, useState} from 'react'

const RadialChart = ({cryptoHoldings, coins}) => {
    const [cryptos, setCryptoValues] = useState([])
    const colours = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c", "#a4de1c", "#a4de9c", "#a4de8c", "#a4de7c"]

    useEffect(() => {
        let cryptos = [];
        let total = 0;
        cryptoHoldings.forEach((ch) => {
            if (!(ch.amount === 0)) {
                coins.forEach((coin) => {

                    if (coin.ticker === ch.ticker) {
                        total = total + (ch.amount * coin.valueInUSD)
                        cryptos.push({
                            "name": ch.name,
                            "ticker": ch.ticker,
                            "fill": colours[ch.id],
                            "value": ch.amount * coin.valueInUSD

                        })
                    }
                })
            }

        })
        cryptos.forEach((asset) => {
            asset.value = (asset.value / total)
        })
        setCryptoValues(cryptos)

    }, [cryptoHoldings, coins])

    let i = 0;
    return (
        <div id='radBar'>
            <RadialBarChart
                id='rdChart'
                width={400}
                height={200}
                innerRadius="30%"
                outerRadius="120%"
                data={cryptos}
                startAngle={180}
                endAngle={0}
                padding={'2em'}
                // margin={{ top: 1000, right: 0, bottom: 600, left: 0 }}
                cx='27%'
                cy={'70%'}

            >
                <RadialBar minAngle={15} label={{fill: 'black', position: 'center'}} background clockWise={true}
                           dataKey='value'/>
                {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
                <Tooltip/>
            </RadialBarChart>
            <div id='labels'>

                {cryptos.map((c) => {
                    i++;
                    return <div key={i} style={{color: c.fill}} className='colorLabel'>
                        <div style={{backgroundColor: c.fill}} className='colorBox'></div>
                        {c.name}
                    </div>

                })}
            </div>
        </div>
    )
}

export default RadialChart