import { useState } from 'react'
import PieChart from './PieChart'
import { ChartItem } from './PieChart';
import "./styles/Table.css"

function DynamicTable({data}: {data: {[key: string]: string | Number}}){
  return (
    <table className='data_table'>
      <thead>
        <tr>
          {Object.keys(data).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            Object.keys(data).map((key:string) => (
              <td>{data[key].toString()}</td>))
          }
        </tr>
      </tbody>
    </table>
  );
}

function DashBoard() {

  let [data,setData] = useState<ChartItem[]>([]);
  let [show_table_data,setTableData] = useState<ChartItem | null>(null);

  let fetch_data = async (id:string)=>
  {
    const api_url = "https://ncerp.in/api/swapi/dsr_list.php?from_date=01-12-2024&to_date=31-12-2024&clinic_uid=" + id;
    let d = await (await fetch(api_url)).json();
    let dt:ChartItem[] = [];
    type d_type = {"service_name":string , "sum_net": Number};
    d.result.dsr_list.forEach((value : d_type) => {
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
  
  let CreateTable = ()=>
    {
      if(show_table_data != null)
        return (
        <>
            <button 
            onClick={() => { setTableData(null) }} 
            style={{
              position: 'relative',
              background: '#4CAF50', // matching green color
              top: "-10px",
              left:"-10px",
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
            &times;
            </button>
          <DynamicTable data={show_table_data}/>
        </>
        );
      return (<></>);
    }

  return (
    <>
      <input type='text' onChange={(e) => onchng(e.target.value)} />
      <div style={{ width: show_table_data == null ? "100%" : "50%", height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'width 0.2s ease-in-out' }}>
        <PieChart data={ data } handle_func={(data:ChartItem)=>{setTableData(data)}} />
      </div>
      <div style={{ width: show_table_data == null ? "0%" : "50%", height: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center' , transition: 'width 0.2s ease-in-out'}}>
        <CreateTable/>
      </div>
    </>
  )
}

export default DashBoard;