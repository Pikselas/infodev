import { useState } from "react";
import BarChart from "../../Components/BarChart";
import PageLayout from "../../Layout/PageLayout";
import RequestForm from "../../Layout/RequestForm";
import { create_api_request } from "../../Utils/Authenticated";

function Promotions() {
    let [patient_total, setPatientTotal] = useState<{ source_name: string, total_patients: number }[]>([]);
    const fetch_total_promotions = async (from: string, to: string,id: string) => 
        {
            let data = await (await create_api_request("/api/get_patient_source_total", { clinic_id: id, from_date: from, to_date: to })).json()
            setPatientTotal(data)
        };
  return (
    <PageLayout title="Promotions">
        <RequestForm onSubmit={fetch_total_promotions} />
        <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <BarChart X_axisName="Source Name" Y_axisName="Patients" IndexBy="source_name" NumericKeyName="total_patients" Data={patient_total} />
        </div>
    </PageLayout>
  );
}

export default Promotions;