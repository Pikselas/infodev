import { useState } from "react";
import { create_api_request } from "../../Utils/Authenticated";
import PieChart, { ChartItem } from "../../Components/PieChart";
import PageLayout from "../../Layout/PageLayout";
import RequestForm from "../../Layout/RequestForm";

function PaymentModeWiseRevenue() {
  let [mode_data, setModeData] = useState<ChartItem[]>([]);
  let [bill_list, setBillList] = useState<{ net_amount: string, receipt_no: number, receipt_prefix: string , entry_date_time:string  }[]>([]);

  const fetch_payment_data = async (from_date:string , to_date:string , clinic_id:string) => {
      let data = await create_api_request("/api/get_revenue_by_payment_mode",
        {
          clinic_id: clinic_id,
          from_date: from_date,
          to_date: to_date
        });
      setModeData((await data.json()).map((dv: any) => {
        let chrt_itm: ChartItem = {
          id: dv.mode_name,
          label: dv.mode_name,
          value: dv.revenue,
          color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          user_data: { from_date: from_date, to_date: to_date, payment_mode: dv.uid, clinic_id: clinic_id }
        };
        return chrt_itm;
      }));
  };
  const fetch_bill_breakdown = async (filter: { payment_mode: string, from_date: string, to_date: string, clinic_id: string }) => {
    let data = await create_api_request("/api/get_bill_breakdown_by_payment_mode", filter);
    setBillList(await data.json());
  }
  return (
    <PageLayout title="Payment Mode Wise Revenue">
        <RequestForm onSubmit={fetch_payment_data} />
        <div className="form-group">
          {/* <label htmlFor="email">Input ID</label>
                    <input onChange={(e) => onchng(e.target.value)} type="text" className="form-control" id="id" placeholder="Enter ID"/> */}
          <div style={{ width: "100%", height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <PieChart data={mode_data} handle_func={(data: ChartItem) => { fetch_bill_breakdown(data.user_data) }} />
          </div>
        </div>
        <div style={{ height: "350px", overflow: "auto" }}>
          <table className="table table-hover">
            <thead style={{ position: "sticky", top: "0px", backgroundColor: "white" }} >
              <tr>
                <th scope="col">Receipt No</th>
                <th scope="col">Net Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {bill_list.map((bill, index) => (
                <tr key={index}>
                  <td>{bill.receipt_prefix + bill.receipt_no.toString().padStart(9, '0')}</td>
                  <td>{bill.net_amount}</td>
                  <td>{bill.entry_date_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </PageLayout>
  );
}

export default PaymentModeWiseRevenue;