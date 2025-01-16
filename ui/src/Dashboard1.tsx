import { useState } from 'react'
import PieChart from './PieChart'
import { ChartItem } from './PieChart';
import { create_api_request } from './Authenticated';

async function get()
{
  let data = await create_api_request("http://127.0.0.1:5000/api/get")
  console.log(await data.json())
}

function Dashboard1()
{
    let [data,setData] = useState<ChartItem[]>([]);

    let fetch_data = async (id:string)=>
        {

          // get();

          // const api_url = "https://ncerp.in/api/swapi/dsr_list.php?from_date=01-12-2024&to_date=31-12-2024&clinic_uid=" + id;
          // let d = await (await fetch(api_url)).json();
          
          let d = await (await create_api_request("http://127.0.0.1:5000/api/get_chart_d" , {clinic_id:id})).json()
          
          let dt:ChartItem[] = [];
          type d_type = {"service_name":string , "sum_net": Number};
          d.forEach((value : d_type) => {
              const getRandomColor = () => {
                const hue = Math.floor(Math.random() * 360);
                return `hsl(${hue}, 70%, 50%)`;
              };
      
            dt.push({
              "id": value.service_name,
              "label": value.service_name,
              "value": value.sum_net.toString(),
              "color": getRandomColor()
            });
          });
          setData(dt);
        };
      
        let onchng = (id: string) => { fetch_data(id) };

    return (
    <div className="main-panel">
    <div className="content">
      <div className="container-fluid">
        <h4 className="page-title">Dashboard</h4>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Table</div>
              </div>
              <div className="card-body">
              <div className="form-group">
                <label htmlFor="email">Input ID</label>
                <input onChange={(e) => onchng(e.target.value)} type="text" className="form-control" id="id" placeholder="Enter ID"/>
                <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <PieChart data={ data } handle_func={(data:ChartItem)=>{}} />
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

export default Dashboard1;