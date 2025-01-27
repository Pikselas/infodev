import { useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import RequestForm from "../../Layout/RequestForm";
import { create_api_request } from "../../Utils/Authenticated";
import PieChart, { ChartItem } from "../../Components/PieChart";

function DoctorWiseRevenue()
{
    let [data, setData] = useState<ChartItem[]>([]);
    let [patient_list, setPatientList] = useState<{ patient_uid: string, name: string, approve_date: string, entry_date_time: string }[]>([]);
    const fetch_total_patient = async (from: string, to: string,id: string) => 
        {
            let data = await (await create_api_request("/api/get_total_patient_admissions", { clinic_id: id, from_date: from, to_date: to })).json()
            let new_data: ChartItem[] = [];
            data.map((itm: any) =>
            {
                let chrt_data: ChartItem = {
                    id: "", label: "", value: "0",
                    color: ""
                };
                chrt_data.id = itm.patient_status;
                chrt_data.label = itm.patient_status;
                chrt_data.value = itm.total_patient;
                chrt_data.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
                chrt_data.user_data = {"from_date" : from, "to_date" : to, "clinic_id" : id, "app_type" : itm.app_type};
                new_data.push(chrt_data);
            });
            setData(new_data);
        };
    return (
        <PageLayout title="Patient Admissions">
            <RequestForm onSubmit={fetch_total_patient} />
            <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <PieChart data={data} handle_func={(data: ChartItem) => { 
                    (async () => {
                        let f_data = await (await create_api_request("/api/get_patient_admissions_by_type", data.user_data)).json();
                        setPatientList(f_data);
                    })();
                }} />
            </div>
            <div style={{ height: "350px", overflow: "auto" }}>
          <table className="table table-hover">
            <thead style={{ position: "sticky", top: "0px", backgroundColor: "white" }} >
              <tr>
                <th scope="col">Patient ID</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Register Date</th>
              </tr>
            </thead>
            <tbody>
              {patient_list.map((patient, index) => (
                <tr key={index}>
                    <td>{patient.patient_uid}</td>
                    <td>{patient.name}</td>
                    <td>{patient.approve_date}</td>
                    <td>{patient.entry_date_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </PageLayout>
    );
}

export default DoctorWiseRevenue;