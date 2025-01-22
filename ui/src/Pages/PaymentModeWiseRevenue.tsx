import React, { useEffect, useState } from "react";
import { create_api_request } from "../Utils/Authenticated";
import PieChart, {ChartItem} from "../Components/PieChart";

function PaymentModeWiseRevenue() {
    let [clinic_options,setClinics] = useState<{uid:string , clinic_code:string}[]>([]);
    let [mode_data,setModeData] = useState<ChartItem[]>([]);

    const fetch_clinics = async ()=>
    {
        let data = await(await create_api_request("http://127.0.0.1:5000/api/get_clinics")).json()
        setClinics(data);
    };
    const handle_submit = (e:React.FormEvent) =>
        {
            e.preventDefault();
            let form_data = new FormData(e.target as HTMLFormElement);
            const fetch_func = async()=>
            {
                let data = await create_api_request("http://127.0.0.1:5000/api/get_revenue_by_payment_mode",
                {
                    clinic_id: form_data.get("clinic_id") as string,
                    from_date: form_data.get("from_date") as string,
                    to_date: form_data.get("to_date") as string,
                });
                setModeData((await data.json()).map((dv:any)=> {
                    let chrt_itm:ChartItem = {
                        id: dv.mode_name,
                        label: dv.mode_name,
                        value: dv.revenue,
                        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
                    };
                    return chrt_itm;
                }));
            };
            fetch_func();
        };
    
    useEffect(()=>
        {
        fetch_clinics();
        },[])
  return (
        <div className="main-panel">
        <div className="content">
          <div className="container-fluid">       
            <div className="row">
              <div className="col-md-12">
                <div className="card">             
                  <div className="card-body">
                  <form onSubmit={handle_submit}>
                    <div className="row">
                    <div className="col-md-3">
                    <div className="form-group">
                      <label htmlFor="fromDate">From Date</label>
                      <input type="date" className="form-control" name="from_date" 
                            defaultValue={new Date().toISOString().split('T')[0]}/>
                    </div>
                      </div>
                      <div className="col-md-3">
                      <div className="form-group">
                      <label htmlFor="toDate">To Date</label>
                      <input type="date" className="form-control" name="to_date" 
                            defaultValue={new Date().toISOString().split('T')[0]}/>
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
                        <PieChart data={ mode_data } handle_func={(data:ChartItem)=>{}} />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer style={{ position:"fixed" , bottom:"0px" , right:"0px" }} className="footer">
          <div className="container-fluid">
            <div className="copyright ml-auto"> @ 2025, Design & Developed By <a href="#">Infonetics</a> </div>
          </div>
        </footer>
        </div>
  );
}

export default PaymentModeWiseRevenue;