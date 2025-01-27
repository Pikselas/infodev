import { useState } from "react";
import BarChart from "../../Components/BarChart";
import PageLayout from "../../Layout/PageLayout";
import RequestForm from "../../Layout/RequestForm";
import { create_api_request } from "../../Utils/Authenticated";

function DoctorWiseRevenue()
{
    let [employee_data, setEmployeeData] = useState<{ full_name: string, id: string, revenue: number }[]>([]);
    const fetch_employee_revenue = async (from_date:string, to_date:string,clinic_id:string) => {
        const url = "/api/get_revenue_by_doctor";
        const data = await create_api_request(url, {
          clinic_id: clinic_id,
          from_date: from_date,
          to_date: to_date,
        });
        setEmployeeData(await data.json());
      };
    return (
        <PageLayout title="Doctor Wise Revenue">
            <RequestForm onSubmit={fetch_employee_revenue} />
            <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <BarChart X_axisName="Doctor Name" Y_axisName="Revenue Generated" IndexBy="full_name" NumericKeyName="revenue" Data={employee_data} />
            </div>
        </PageLayout>
    );
}

export default DoctorWiseRevenue;