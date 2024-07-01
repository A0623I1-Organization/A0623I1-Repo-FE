import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "./Employee.scss";
import * as roleService from "../../../services/employee/RoleService";
import * as employeeService from "../../../services/employee/EmployeeService";
import {useParams} from "react-router-dom";

export function EmployeeCreate(){
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [roles,setRoles] = useState([]);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                // Fetch employee data by id and set form values
                await getEmpById(id);
            } else {
                await getRoleList();
            }
        }
        fetchData();
    }, [id])

    const getEmpById = async (id) => {
        const token = localStorage.getItem("token");
        const temp = await employeeService.findEmployeeById(token, id);
        if (temp) {
            setEmployee(temp);
            setValue("userId", temp.userId);
            setValue("username", temp.username);
            setValue("userCode", temp.userCode);
            setValue("fullName", temp.fullName);
            setValue("gender", temp.gender);
            setValue("dateOfBirth", temp.dateOfBirth);
            setValue("dateCreate", temp.dateCreate);
            setValue("phoneNumber", temp.phoneNumber);
            setValue("email", temp.email);
            setValue("address", temp.address);
            setValue("role", JSON.stringify(temp.role));
            setRoles(temp.roles);
        }
    }

    const getRoleList = async () => {
        const temp = await roleService.getAllRoles();
        setRoles(temp);
    }

    const onSubmit = async (data) => {
        try {
            data.role = JSON.parse(data.role);
            const token = localStorage.getItem("token");
            let response;
            if (id) {
                response = await employeeService.updateEmployee(id, data, token);
            } else {
                response = await employeeService.saveEmployee(data, token);
            }
            if (response.statusCode === 200) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return(
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
            <div id={"content-wrapper"}>
                <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
                <div className="app-content">

                    <div className="content-body">
                        <form className="content-element" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex-content">
                                <div className="form-operation">
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Mã nhân viên: </span>
                                        </label>
                                        <input type="text" {...register("userCode")} />
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Tên nhân viên: </span>
                                        </label>
                                        <input type="text" {...register("fullName")}/>
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Ngày sinh: </span>
                                        </label>
                                        <input type="date" {...register("dateOfBirth")} />
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Giới tính: </span>
                                        </label>
                                        <div className="form-gender">
                                            <input type="radio"
                                                   {...register("gender")} value={0}/>
                                            <span>Nam</span>
                                            <input type="radio"
                                                   {...register("gender")} value={1}/>
                                            <span>Nữ</span>
                                            <input type="radio"
                                                   {...register("gender")} value={2}/>
                                            <span>Khác</span>
                                        </div>
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Email: </span>
                                        </label>
                                        <input type="email" {...register("email")}/>
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Địa chỉ: </span>
                                        </label>
                                        <input type="text" {...register("address")} />
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Số điện thoại: </span>
                                        </label>
                                        <input type="text" {...register("phoneNumber")} />
                                    </div>
                                    <div className="form-element">
                                        <label>
                                            <span className={"element-title"}>Chức vụ: </span>
                                        </label>
                                        <select {...register("role")}>
                                            <option value="">--Chọn một vị trí--</option>
                                            {roles && roles.map((item) => (
                                                <option value={JSON.stringify(item)}>{item.roleName}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-operation">
                                    <div className="form-element">
                                        <label>Tên tài khoản: </label>
                                        <input type="text" {...register("username")} name="username"/>
                                    </div>
                                    <div className="new-password form-element">
                                    <label>Mật khẩu: </label>
                                        <input type="password" name="newPassword" {...register("newPassword")}/>
                                        <p className="validate-error">Mật khẩu không đúng định dạng!!</p>
                                    </div>

                                </div>
                            </div>
                            <div className="button-save">
                                <button type="submit" className="btn-submit">
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}