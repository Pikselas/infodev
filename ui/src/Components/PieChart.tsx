import { ResponsivePie , ComputedDatum } from '@nivo/pie'

export type ChartItem = { id: string; label: string; value: string; color: string , user_data?:any };
export type PieChartItems = { data: ChartItem[] , handle_func?: (item:ChartItem) => void};

// interface PieChartProps {
//     data: {
//         id: string;
//         label: string;
//         value: number;
//         color: string;
//     }[];
// }

const PieChart = ({ data , handle_func } : PieChartItems) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        onClick = {(data:ComputedDatum<ChartItem>)=>{ if(handle_func) handle_func(data.data) }}
    />
)

export default PieChart;