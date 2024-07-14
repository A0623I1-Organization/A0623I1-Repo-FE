import {useEffect, useState} from "react";
import * as employeeService from "../../../services/employee/EmployeeService";
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
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowUnsorted } from "react-icons/ti";

export function EmployeeList() {
    const {role} = useParams();
    const [employeeList, setEmployeeList] = useState([]);
    const [totalPages, setTotalPages] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [searchContent, setSearchContent] = useState('');
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [userId, setUserId] = useState(null);
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState(null);
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [codeSort, setCodeSort] = useState({
        field: "",
        direction: ""
    });
    const [nameSort, setNameSort] = useState({
        field: "",
        direction: ""
    });
    const [roleSort, setRoleSort] = useState({
        field: "",
        direction: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            await getEmployeeList('', '', codeSort.field, codeSort.direction,
                nameSort.field, nameSort.direction, roleSort.field, roleSort.direction);
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await getEmployeeList(pageNumber, searchContent, codeSort.field, codeSort.direction,
                nameSort.field, nameSort.direction, roleSort.field, roleSort.direction);
        }
        fetchData();
    }, [pageNumber])

    useEffect(() => {
        const fetchData = async () => {
            await getEmployeeList(pageNumber, searchContent, codeSort.field, codeSort.direction,
                nameSort.field, nameSort.direction, roleSort.field, roleSort.direction);
        }
        fetchData();
    }, [codeSort, nameSort, roleSort]);

    const getEmployeeList = async (page, searchContent, codeSort, codeDirection, nameSort, nameDirection,
                                   roleSort, roleDirection) => {
        const temp = await employeeService.getAllEmployees(page, searchContent, codeSort, codeDirection,
            nameSort, nameDirection, roleSort, roleDirection);
        setEmployeeList(temp.content);
        setTotalPages(temp.totalPages);
    }

    const onSubmit = async (data) => {
        try {
            switch (data.searchContent.toLowerCase()) {
                case "nhân viên" :
                    data.searchContent = "role"
                    break;
                case "nhân viên bán hàng" || "bán hàng":
                    console.log("salesman")
                    data.searchContent = "salesman";
                    break;
                case "Quản lý kho" || "Nhân viên kho" || "Kho" :
                    data.searchContent = "warehouse";
                    break;
                case "quản lý cửa hàng" || "quản lý" || "cửa hàng" :
                    data.searchContent = "manager";
                    break;
                default:
                    break;
            }
            const temp = await employeeService.getAllEmployees('', data.searchContent);
            setSearchContent(data.searchContent);
            setEmployeeList(temp.content);
            setTotalPages(temp.totalPages);
            setMessage(null);
        } catch (error) {
            setMessage(error);
            setEmployeeList([]);
            setTotalPages({})
        }
    }

    const openDetailModal = (id) => {
        setIsModalOpen(true);
        setUserId(id);
    }

    const closeDetailModal = () => setIsModalOpen(false);

    const showPageNo = () => {
        let pageNoTags = [];
        for (let i = 0; i < totalPages; i++) {
            pageNoTags.push(<a key={i} className="page-a" onClick={() => handlePage(i)}>{i + 1}</a>);
        }
        return pageNoTags;
    }

    const handlePage = (pageNo) => {
        setPageNumber(pageNo);
    }

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
                                    <th className={"no"}>
                                        STT
                                    </th>
                                    <th className={"emp-code"}>
                                        <span>Mã nhân viên</span>
                                        {codeSort.direction === "" ?
                                            <button className="sort-button"
                                                    onClick={() => setCodeSort({field: "userCode", direction: "asc"})}>
                                                <TiArrowUnsorted/>
                                            </button>
                                            : codeSort.direction === "asc" ?
                                                <button className="sort-button"
                                                        onClick={() => setCodeSort({
                                                            field: "userCode",
                                                            direction: "desc"
                                                        })}>
                                                    <TiArrowSortedDown/>
                                                </button>
                                                : <button className="sort-button"
                                                          onClick={() => setCodeSort({field: "", direction: ""})}>
                                                    <TiArrowSortedUp/>
                                                </button>
                                        }
                                    </th>
                                    <th className={"emp-name"}>
                                        <span>Họ và tên</span>
                                        {nameSort.direction === "" ?
                                            <button className="sort-button"
                                                    onClick={() => setNameSort({
                                                        field: "fullName",
                                                        direction: "asc"
                                                    })}>
                                                <TiArrowUnsorted/>
                                            </button>
                                            : nameSort.direction === "asc" ?
                                                <button className="sort-button"
                                                        onClick={() => setNameSort({
                                                            field: "fullName",
                                                            direction: "desc"
                                                        })}>
                                                    <TiArrowSortedDown/>
                                                </button>
                                                : <button className="sort-button"
                                                          onClick={() => setNameSort({
                                                              field: "",
                                                              direction: ""
                                                          })}>
                                                    <TiArrowSortedUp/>
                                                </button>
                                        }
                                    </th>
                                    <th className={"emp-role"}>
                                        <span>Chức vụ</span>
                                        {roleSort.direction === "" ?
                                            <button className="sort-button"
                                                    onClick={() => setRoleSort({
                                                        field: "role",
                                                        direction: "asc"
                                                    })}>
                                                <TiArrowUnsorted/>
                                            </button>
                                            : roleSort.direction === "asc" ?
                                                <button className="sort-button"
                                                        onClick={() => setRoleSort({
                                                            field: "role",
                                                            direction: "desc"
                                                        })}>
                                                    <TiArrowSortedDown/>
                                                </button>
                                                : <button className="sort-button"
                                                          onClick={() => setRoleSort({
                                                              field: "",
                                                              direction: ""
                                                          })}>
                                                    <TiArrowSortedUp/>
                                                </button>
                                        }
                                    </th>
                                    <th className={"email"}>
                                        Email
                                    </th>
                                    <th className={"phoneNumber"}>
                                        Số điện thoại
                                    </th>
                                    <th className={"edit-emp"}>Chỉnh sửa</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employeeList && employeeList.map((employee, index) => (
                                    <tr key={employee.userId}>
                                        <td className={"no"}>{++index}</td>
                                        <td className={"emp-code"}>{employee.userCode}</td>
                                        <td className={"emp-name"}>{employee.fullName}</td>
                                        <td className={"emp-role"}>
                                            {employee.role.roleId === 1 ? "Admin"
                                                : employee.role.roleId === 2 ? "Quản lý cửa hàng"
                                                    : employee.role.roleId === 3? "Nhân viên bán hàng"
                                                        : "Quản lý kho"}
                                        </td>
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
                            {message !== null && <p className="list-error">{message}</p>}
                        </div>

                        <div className="page">
                            <div className="page-box">
                                {pageNumber !== 0 &&
                                    <a className="page-a" onClick={() => handlePage(pageNumber - 1)}>Trang trước</a>
                                }
                                <span>
                                    {showPageNo()}
                                </span>
                                {pageNumber < (totalPages - 1) &&
                                    <a className="page-a" onClick={() => handlePage(pageNumber + 1)}>Trang sau</a>
                                }
                            </div>
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