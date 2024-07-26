import '../warehouse/warehouse.scss'
import {DashboardMain} from "../../../../components/Dashboard/DashboardMain";
import React, {useEffect, useState} from "react";
import * as billService from '../../../../services/bill/bill-service'
import {useParams} from "react-router-dom";
const BillList =()=>{
    const [bills,setBills] = useState([])
    const {role} = useParams();
    const [page,setPage]= useState(0);
    const [search,setSearch]= useState('');
    const [date,setDate]= useState(null);
    console.log(bills)
    const getAllBills =(page,search,date)=>{
        billService.getAllBill(page,search,date).then(res=>setBills(res.content)).catch()
    }
    console.log(bills)
    useEffect(() => {
        getAllBills(page,search,date);
    }, [page,search,date]);
    return(
        <DashboardMain path={role} content={
            <div className="content-body">
                <div className="content-element">
                    <div className="header-content">
                        <form className="form-search">
                            <input type="date" onChange={e=>setDate(e.target.value)}/>
                            <input type="text" placeholder="Search..." className="search-bar" onChange={e=>setSearch(e.target.value)}/>
                            <button className="btn btn-search">Search</button>
                        </form>
                    </div>
                    <div className="box-content" id='warehouse-table'>
                        <p>Danh sách hóa đơn</p>
                        {/* Data table content */}
                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    STT
                                </th>
                                <th>
                                    Mã hóa đơn
                                </th>
                                <th>
                                    Tên khách hàng
                                </th>
                                <th >
                                    Ngày tạo
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {!bills ? <tr><td colSpan="7" className='container'>Không có kết quả</td></tr> :
                                bills?.map((item, index) => (
                                    <tr key={item.billId}>
                                        <td>{index + 1}</td>
                                        <td>{item.billCode}</td>
                                        <td>{item.customer.customerName}</td>
                                        <td>{item.dateCreate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
            />
    );
}
export  default BillList;