import { useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import RequestForm from "../../Layout/RequestForm";
import { create_api_request } from "../../Utils/Authenticated";
import PieChart, { ChartItem } from "../../Components/PieChart";

function DoctorWiseRevenue()
{
    let [data, setData] = useState<ChartItem[]>([]);
    const fetch_total_patient = async (from: string, to: string,id: string) => 
        {
            let data = await (await create_api_request("/api/get_total_patient_by_type", { clinic_id: id, from_date: from, to_date: to })).json()
            let new_data: ChartItem[] = [];
            data.map((itm: any) =>
            {
                let chrt_data: ChartItem= {
                    id: "", label: "", value: "0",
                    color: ""
                };
                chrt_data.id = itm.patient_status;
                chrt_data.label = itm.patient_status;
                chrt_data.value = itm.total_patient;
                chrt_data.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
                new_data.push(chrt_data);
            });
            setData(new_data);
        };
    return (
        <PageLayout>
            <RequestForm onSubmit={fetch_total_patient} />
            <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <PieChart data={data} handle_func={(data: ChartItem) => { }} />
            </div>
        </PageLayout>
    );
}

export default DoctorWiseRevenue;