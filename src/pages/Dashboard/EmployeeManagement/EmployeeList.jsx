import {useEffect, useState} from "react";
import * as employeeService from "../../../services/employee/EmployeeService";
import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "./Employee.scss";
import Moment from "moment";
import {Link, useNavigate, useParams} from "react-router-dom";
import {MdOutlineModeEdit} from "react-icons/md";
import {BiSolidShow} from "react-icons/bi";
import {IoTrashSharp} from "react-icons/io5";
import {DashboardMain} from "../../../components/Dashboard/DashboardMain";
import {EmployeeDetailModal} from "./employDetailModal/EmployeeDetailModal";

export function EmployeeList() {
    const {role} = useParams();
    const [employeeList, setEmployeeList] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [userId, setUserId] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            const token = localStorage.getItem("token");
            const temp = await employeeService.getAllEmployees(token, '', data.searchContent);
            setEmployeeList(temp);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const openDetailModal = (id) => {
        setIsModalOpen(true);
        setUserId(id);
    }
    const closeDetailModal = () => setIsModalOpen(false);

    return (
        <DashboardMain path={role}
            content={
                <div className="content-body">
                    <div className="content-element">
                        <div className="header-content">
                            <form onSubmit={handleSubmit(onSubmit)} className="form-search">
                                <input type="text" {...register("searchContent")} className="search-bar"
                                       placeholder="Nhập nội dung tìm kiếm"/>
                                <button className="btn btn-search">Search</button>
                            </form>
                            <Link to={"/dashboard/storeManager/employee-create"} className="link-move">Thêm mới nhân
                                viên</Link>
                        </div>
                        <div className="box-content">
                            <p>Danh sách nhân viên</p>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className={"No"}>STT</th>
                                    <th className={"emp-code"}>Mã nhân viên</th>
                                    <th className={"emp-name"}>Họ và tên</th>
                                    <th className={"email"}>Email</th>
                                    <th className={"phoneNumber"}>Số điện thoại</th>
                                    <th className={"edit-emp"}>Chỉnh sửa</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employeeList && employeeList.map((employee, index) => (
                                    <tr key={employee.userId}>
                                        <td className={"No"}>{++index}</td>
                                        <td className={"emp-code"}>{employee.userCode}</td>
                                        <td className={"emp-name"}>{employee.fullName}</td>
                                        <td className={"email"}>{employee.email}</td>
                                        <td className={"phoneNumber"}>{employee.phoneNumber}</td>
                                        <td className={"edit-emp"}>
                                            <a onClick={() => openDetailModal(employee.userId)}>
                                                <BiSolidShow fill="#3dc8d8"/>
                                            </a>
                                            <Link to={`/dashboard/storeManager/employee-create/${employee.userId}`}>
                                                <MdOutlineModeEdit fill="#00a762"/>
                                            </Link>
                                            <a>
                                                <IoTrashSharp fill="red"/>
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
                    <EmployeeDetailModal
                        isOpen={isModalOpen}
                        onClose={closeDetailModal}
                        id={userId}
                    >
                    </EmployeeDetailModal>
                </div>
            }>
        </DashboardMain>
    );
}