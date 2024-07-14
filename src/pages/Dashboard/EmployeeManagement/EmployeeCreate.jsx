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
            data.gender = Number.parseInt(data.gender);
            let response;
            console.log(data)
            if (id) {
                response = await employeeService.updateEmployee(id, data);
            } else {
                response = await employeeService.saveEmployee(data);
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

    return (
        <DashboardMain path={role} content={
            <div className="content-body">
                <form className="content-element" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-title">
                        <p className="title">{id === undefined ? "Thêm mới" : "Cập nhật"} nhân viên</p>
                    </div>
                    <div className="flex-content">
                        <div className="form-operation">
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Mã nhân viên: </span>
                                </label>
                                <input type="text" disabled={id !== undefined} {...register("userCode", {
                                    required: "Mã nhân viên không được để trống!",
                                    pattern: {value: /^NV\d{4}$/, message: "Mã nhân viên phải được bắt đầu bằng NV và kết thúc với 4 chữ số!"}
                                    })} />
                                {errors.userCode && <p className="validate-error">{errors.userCode.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Tên nhân viên: </span>
                                </label>
                                <input type="text" {...register("fullName", {
                                    required: "Tên nhân viên không được để trống!",
                                    maxLength: {value: 50, message : "Tên nhân viên được quá 50 Ký tự!"},
                                    pattern: {value: /^[A-Za-zÀ-ỹà-ỹĂăÂâÊêÔôƠơƯưĐđ\s]+$/, message: "Tên nhân viên không được chứa ký tự số và không được chứa ký tự đặc biệt!"}
                                    })}/>
                                {errors.fullName && <p className="validate-error">{errors.fullName.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Ngày sinh: </span>
                                </label>
                                <input type="date" {...register("dateOfBirth", {
                                    required: "Ngày sinh không được để trống!"
                                    })} />
                                {errors.dateOfBirth && <p className="validate-error">{errors.dateOfBirth.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Giới tính: </span>
                                </label>
                                <div className="form-gender">
                                    {id && employee?.gender === 0 ?
                                        <input type="radio" checked {...register("gender")} value={0}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={0}/>
                                    }
                                    <span>Nam</span>
                                    {id && employee?.gender === 1 ?
                                        <input type="radio" checked {...register("gender")} value={1}/>
                                        : <input type="radio"{...register("gender", {
                                            required: "Giới tính không được để trống!"
                                        })} value={1}/>
                                    }
                                    <span>Nữ</span>
                                    {id && employee?.gender === 2 ?
                                        <input type="radio" checked {...register("gender")} value={2}/>
                                        : <input type="radio"{...register("gender",{
                                            required : "Giới tính không được để trống!"
                                        })} value={2}/>
                                    }
                                    <span>Khác</span>
                                </div>
                                {errors.gender && <p className="validate-error">{errors.gender.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Email: </span>
                                </label>
                                <input type="email" {...register("email",{
                                    required : "Email không được để trống!"
                                })}/>
                                {errors.email && <p className="validate-error">{errors.email.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Địa chỉ: </span>
                                </label>
                                <input type="text" {...register("address",{
                                    required : "Địa chỉ không được để trống!"
                                })} />
                                {errors.address && <p className="validate-error">{errors.address.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Số điện thoại: </span>
                                </label>
                                <input type="text" {...register("phoneNumber",{
                                    required : "Số điện thoại không được để trống!",
                                    pattern : {value: /^(?:\+84|0)\d{9}$/, message: "Số điện thoại phải bắt đầu bằng +84 hoặc 0 và kết thúc với 9 số!"}
                                })} />
                                {errors.phoneNumber && <p className="validate-error">{errors.phoneNumber.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>
                                    <span className={"element-title"}>Chức vụ: </span>
                                </label>
                                <select {...register("role",{
                                    required : "Chức vụ không được để trống!"
                                })}>
                                    <option value="">--Chọn một vị trí--</option>
                                    {roles && roles.map((item) => (
                                        <option selected={item.roleId === employee?.role.roleId}
                                                value={JSON.stringify(item)}>
                                            {item.roleId === 1 ? "Admin"
                                                : item.roleId === 2 ? "Quản lý cửa hàng"
                                                    : item.roleId === 3? "Nhân viên bán hàng"
                                            : "Quản lý kho"}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <p className="validate-error">{errors.role.message}</p>}
                            </div>
                        </div>
                        <div className="form-operation">
                            <div className="form-element">
                                <label>Tên tài khoản: </label>
                                <input type="text" {...register("username", {
                                    required: "Tên tài khoản không được để trống!",
                                    minLength: {value: 4, message: "Tên tài khoản phải chứa tối thiểu 4 ký ự!"},
                                    maxLength: {value: 50, message: "Tên tài khoản chỉ được tối đa 50 ký tự!"}
                                })} name="username"/>
                                {errors.username && <p className="validate-error">{errors.username.message}</p>}
                            </div>
                            <div className="new-password form-element">
                                <label>Mật khẩu: </label>
                                {id === undefined ?
                                    <input type="password" name="password" {...register("password",
                                        {required: "Mật khẩu không được để trống!"})}
                                    />
                                    : <input type="password" name="password" {...register("password")}
                                    />
                                }
                                {errors.password && <p className="validate-error">{errors.password.message}</p>}
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