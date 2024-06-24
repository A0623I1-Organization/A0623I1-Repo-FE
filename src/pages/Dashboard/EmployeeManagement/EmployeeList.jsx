import {useEffect, useState} from "react";
import * as employeeService from "../../../services/employee/EmployeeService";
import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "./Employee.scss";
import Moment from "moment";
import {Link} from "react-router-dom";

export function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
    }

    useEffect(() => {
        const fetchData = async () => {
            await getEmployeeList();
        };
        fetchData();
    }, [])

    const getEmployeeList = async () => {
        const token = localStorage.getItem("token");
        const temp = await employeeService.getAllEmployees(token, '', '');
        setEmployeeList(temp);
    }

    const onSubmit = async (data) => {
        try {

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
            <div id={"content-wrapper"}>
                <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
                <div className="app-content">

                    <div className="content-body">
                        <div className="content-element">

                            <form onSubmit={handleSubmit(onSubmit)} className="header-content">
                                <input type="text" {...register("titleSearch")} className="search-bar"
                                       placeholder="Nhập nội dung tìm kiếm"/>
                                <button className="btn btn-search">Search</button>
                            </form>

                            <div className="box-content">
                                <p>Danh sách nhân viên</p>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã nhân viên</th>
                                        <th>Họ và tên</th>
                                        <th>Giới tính</th>
                                        <th>Ngày sinh</th>
                                        <th>Địa chỉ</th>
                                        <th>Email</th>
                                        <th>Số điện thoại</th>
                                        <th>Chỉnh sửa</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employeeList && employeeList.map((employee, index) => (
                                        <tr key={employee.userId}>
                                            <td>{++index}</td>
                                            <td>{employee.userCode}</td>
                                            <td>{employee.fullName}</td>
                                            <td>
                                                {employee.gender === 0? "Nam" : employee.gender === 1 ? "Nữ" : "Khác"}
                                            </td>
                                            <td>{Moment(employee.dateOfBirth).format("DD/MM/yyyy")}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.phoneNumber}</td>
                                            <td>
                                                <a>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 576 512">
                                                        <path
                                                            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208
                                                            2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4
                                                            399.4C142.5 443.2 207.2 480 288 480s145.5-36.8
                                                            192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7
                                                            0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32
                                                            288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288
                                                            0zm144-64c0 35.3-28.7 64-64 64c-7.1
                                                            0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3
                                                            13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4
                                                            67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2
                                                            6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                                                            fill="#3dc8d8"/>
                                                    </svg>
                                                </a>
                                                <Link to={`/dashboard/employee-create/${employee.userId}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512">
                                                        <path
                                                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3
                                                             11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1
                                                             480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7
                                                             6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7
                                                             410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4
                                                              452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2
                                                               16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3
                                                               67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6
                                                               14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5
                                                                0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4
                                                                0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                                            fill="#00a762"/>
                                                    </svg>
                                                </Link>
                                                <a>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 448 512">
                                                        <path
                                                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2
                                                            6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32
                                                            32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32
                                                            128H416V448c0 35.3-28.7 64-64 64H96c-35.3
                                                            0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2
                                                             16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16
                                                              7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2
                                                              16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0
                                                               8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                                                            fill="red"/>
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="page">
                                <a className="page-a">Previous page</a>
                                <span>
                                    <a className="page-a">1</a>
                                    <a className="page-a">2</a>
                                </span>
                                <a className="page-a">Next page</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}