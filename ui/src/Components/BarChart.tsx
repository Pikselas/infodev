import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

interface BarDatum {
    [key: string]: string | number;
}

interface BarChartData {
    X_axisName: string;
    Y_axisName: string;
    IndexBy: string;
    NumericKeyName: string;
    Data: BarDatum[];
}

const BarChart: React.FC<BarChartData> = ({ X_axisName, Y_axisName, IndexBy, NumericKeyName, Data }) => (
    <ResponsiveBar
        data={Data}
        keys={[NumericKeyName]}
        indexBy={IndexBy}
        margin={{ top: 50, right: 130, bottom: 100, left: 120 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45, // Rotate labels to prevent overlap
            legend: X_axisName,
            legendPosition: 'middle',
            legendOffset: 70,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: Y_axisName,
            legendPosition: 'middle',
            legendOffset: -90,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
        animate={true}
        motionConfig="gentle"
    />
);

export default BarChart;