import React, { useEffect, useState } from "react";
import { create_api_request } from "../Utils/Authenticated";
import BarChart from "../Components/BarChart";
import PageLayout from "../Layout/PageLayout";

function EmployeeWiseRevenue() {


  let [employee_data, setEmployeeData] = useState<{ full_name: string, id: string, revenue: number }[]>([]);
  const fetch_employee_revenue = async (e: React.FormEvent) => {
    e.preventDefault();
    const form_data = new FormData(e.target as HTMLFormElement);
    const url = "/api/get_revenue_by_employee";
    const data = await create_api_request(url, {
      clinic_id: form_data.get("clinic_id") as string,
      from_date: form_data.get("from_date") as string,
      to_date: form_data.get("to_date") as string,
    });
    setEmployeeData(await data.json());
  };

  let [clinic_options, setClinics] = useState<{ uid: string, clinic_code: string }[]>([]);
  const fetch_clinics = async () => {
    let data = await (await create_api_request("/api/get_clinics")).json()
    // console.log(data);
    setClinics(data);
  };

  useEffect(() => {
    fetch_clinics();
  }, [])

  return (
    <PageLayout>
        <form onSubmit={fetch_employee_revenue}>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="fromDate">From Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="from_date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="toDate">To Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="to_date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Select Clinic</label>
                <select className="form-control" name="clinic_id">
                  {
                    clinic_options.map((clinic) => (
                      <option key={clinic.uid} value={clinic.uid}>
                        {clinic.clinic_code}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mt-4">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="form-group">
          {/* <label htmlFor="email">Input ID</label>
                <input onChange={(e) => onchng(e.target.value)} type="text" className="form-control" id="id" placeholder="Enter ID"/> */}
          <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <BarChart X_axisName="Employee Name" Y_axisName="Revenue Generated" IndexBy="full_name" NumericKeyName="revenue" Data={employee_data} />
          </div>
        </div>
    </PageLayout>
  );
}

export default EmployeeWiseRevenue;
