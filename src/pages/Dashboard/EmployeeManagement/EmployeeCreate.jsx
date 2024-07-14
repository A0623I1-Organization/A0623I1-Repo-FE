import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import "./Employee.scss";
import * as roleService from "../../../services/employee/RoleService";
import * as employeeService from "../../../services/employee/EmployeeService";
import {useParams} from "react-router-dom";
import {DashboardMain} from "../../../components/Dashboard/DashboardMain";

export function EmployeeCreate() {
    const {role} = useParams();
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [roles, setRoles] = useState([]);
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
        const temp = await employeeService.findEmployeeById(id);
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
            setValue("accountNonExpired", 1);
            setValue("accountNonLocked", 1);
            setValue("credentialsNonExpired", 1);
            setValue("enabled", 1);
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
            console.log(data.role)
            data.gender = Number.parseInt(data.gender);
            let response;
            console.log(data)
            // if (id) {
            //     response = await employeeService.updateEmployee(id, data);
            // } else {
            //     response = await employeeService.saveEmployee(data);
            // }
            // if (response.statusCode === 200) {
            //     toast.success(response.message);
            // } else {
            //     toast.error(response.message);
            // }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <DashboardMain path={role} content={
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
                                    {id && employee?.gender === 0 ?
                                        <input type="radio" checked {...register("gender")} value={0}/>
                                        : <input type="radio"{...register("gender")} value={0}/>
                                    }
                                    <span>Nam</span>
                                    {id && employee?.gender === 1 ?
                                        <input type="radio" checked {...register("gender")} value={1}/>
                                        : <input type="radio"{...register("gender")} value={1}/>
                                    }
                                    <span>Nữ</span>
                                    {id && employee?.gender === 2 ?
                                        <input type="radio" checked {...register("gender")} value={2}/>
                                        : <input type="radio"{...register("gender")} value={2}/>
                                    }
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
                                        <option selected={item.roleId === employee?.role.roleId}
                                                value={JSON.stringify(item)}>{item.roleName}</option>
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
                                <input type="password" name="password" {...register("password")}/>
                                <p className="validate-error">Mật khẩu không đúng định dạng!!</p>
                            </div>

                        </div>
                    </div>
                    <div className="button-save">
                        <button type="submit" className="btn-submit">
                            {employee ? "Sửa đổi" : "Thêm mới"}
                        </button>
                    </div>
                </form>
            </div>
        }/>
    );
}