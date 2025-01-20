import React, { useEffect, useState } from 'react'
import PieChart from '../Components/PieChart'
import { ChartItem } from '../Components/PieChart';
import { create_api_request } from '../Utils/Authenticated';


type service_breakdown = {full_name:string , patient_uid:string,service_amount:number,discount_amount:number, bill_prefix:string, invoice_no:number};
function Dashboard()
{
    let [data,setData] = useState<ChartItem[]>([]);
    let [clinic_options,setClinics] = useState<{uid:string , clinic_name:string}[]>([]);
    let [bill_list , setBill] = useState<service_breakdown[]>([]);
    let fetch_data = async (id:number , from:string,to:string)=>
        {

          // get();

          // const api_url = "https://ncerp.in/api/swapi/dsr_list.php?from_date=01-12-2024&to_date=31-12-2024&clinic_uid=" + id;
          // let d = await (await fetch(api_url)).json();
          
          let d = await (await create_api_request("http://127.0.0.1:5000/api/get_chart_d" , {clinic_id:id,from_date:from,to_date:to})).json()
          
          let dt:ChartItem[] = [];
          type d_type = {"service_id":number , "service_name":string , "sum_net": number};
          d.forEach((value : d_type) => {
              const getRandomColor = () => {
                const hue = Math.floor(Math.random() * 360);
                return `hsl(${hue}, 70%, 50%)`;
              };
      
            dt.push({
              "id": value.service_name,
              "label": value.service_name,
              "value": value.sum_net.toString(),
              "color": getRandomColor(),
              "user_data": {"clinic_id":id , "service_id":value.service_id , "from_date": from , "to_date":to}
            });
          });
          setData(dt);
        };
    const fetch_clinics = async ()=>
      {
        let data = await(await create_api_request("http://127.0.0.1:5000/api/get_clinics")).json()
        console.log(data);
        setClinics(data);
      };
    const fetch_bill_breakdown = async (fetch_filter:any)=>
    {
      let data = await(await create_api_request("http://127.0.0.1:5000/api/get_bill_breakdown" , fetch_filter)).json()
      console.log(data);
      setBill(data);
    };
    const handle_submit = (e:React.FormEvent) =>
    {
      e.preventDefault();
      let frm_data = new FormData(e.target as HTMLFormElement);
      let from_date = frm_data.get("from_date") as string;
      let to_date = frm_data.get("to_date") as string;
      let clinic_id = parseInt(frm_data.get("clinic_id") as string, 10);
      // console.log(from_date , to_date , clinic_id);
      fetch_data(clinic_id, from_date, to_date);
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
                  <input type="date" className="form-control" name="from_date" />
                </div>
                  </div>
                  <div className="col-md-3">
                  <div className="form-group">
                  <label htmlFor="toDate">To Date</label>
                  <input type="date" className="form-control" name="to_date" />
                </div>
                  </div>
                  <div className="col-md-3">
                  <div className="form-group">
                <label>Select Clinic</label>
                <select className="form-control" name="clinic_id">
                  {
                    clinic_options.map((clinic) => (
                      <option key={clinic.uid} value={clinic.uid}>
                        {clinic.clinic_name}
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
                    <PieChart data={ data } handle_func={(data:ChartItem)=>{fetch_bill_breakdown(data.user_data)}} />
                </div>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">PATIENT NAME</th>
                      <th scope="col">SERVICE AMOUNT</th>
                      <th scope="col">DISCOUNT</th>
                      <th scope="col">NET AMOUNT</th>
                      <th scope="col">INVOICE NO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill_list.map((bill, index) => (
                      <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bill.full_name}</td>
                      <td>{bill.service_amount}</td>
                      <td>{bill.discount_amount}</td>
                      <td>{bill.service_amount - bill.discount_amount}</td>
                      <td>{bill.service_amount - bill.discount_amount}</td>
                      <td>{bill.bill_prefix + bill.invoice_no.toString().padStart(9, '0')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default Dashboard;