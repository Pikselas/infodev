import React, { useState, useEffect } from "react";
import { create_api_request } from "../Utils/Authenticated";

function RequestForm({onSubmit , onClinicFetched}:{onSubmit:(date_start:string , date_end:string , clinic_id:string)=>void , onClinicFetched?:(clinics:{uid:string , clinic_code:string}[])=>void})
{
    let [clinic_options, setClinics] = useState<{ uid: string, clinic_code: string }[]>([]);
    const fetch_clinics = async () => {
        let data = await (await create_api_request("/api/get_clinics")).json()
        if(onClinicFetched) onClinicFetched(data);
        setClinics(data);
    };

    useEffect(() => {
        fetch_clinics();
    }, [])
    return(
        <form onSubmit={(e:React.FormEvent)=>
        {
            e.preventDefault();
            const form_data = new FormData(e.target as HTMLFormElement);
            onSubmit(form_data.get("from_date") as string, form_data.get("to_date") as string, form_data.get("clinic_id") as string);
        }}>
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
                    clinic_options.map((clinic:any) => (
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
    );
}

export default RequestForm;