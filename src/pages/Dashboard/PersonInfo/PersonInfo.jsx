import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useEffect, useState} from "react";
import * as authenticationService from "../../../services/auth/AuthenticationService";
import {useForm} from "react-hook-form";
import "./info.scss";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

export function PersonInfo() {
    const [userInfo, setUserInfo] = useState({})
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [openEyeOne, setOpenEyeOne] = useState(false);
    const [openEyeTwo, setOpenEyeTwo] = useState(false);
    const [openEyeThree, setOpenEyeThree] = useState(false);
    const [roles, setRoles] = useState([])
    const {register, handleSubmit, setValue, getValues, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
    }

    useEffect(() => {
        const fetchData = async () => {
            await getUserInfo();
        }
        fetchData();
    }, [])

    const getUserInfo = async () => {
        const temp = await authenticationService.getYourProfile(localStorage.getItem("token"));
        if (temp) {
            setUserInfo(temp);
            setValue("userId", temp.userId)
            setValue("username", temp.username)
            setValue("userCode", temp.userCode)
            setValue("phoneNumber", temp.phoneNumber)
            setValue("gender", temp.gender)
            setValue("address", temp.address)
            setValue("fullName", temp.fullName)
            setValue("dateOfBirth", temp.dateOfBirth)
            setValue("email", temp.email)
            setValue("dateCreate", temp.dateCreate)
            setValue("avatar", temp.avatar)
            setValue("role", JSON.stringify(temp.role));
            setRoles(temp.roles);
        }
    }

    const onSubmit = async (data) => {
        try {
            data.role = JSON.parse(data.role);
            console.log(data);
            const token = localStorage.getItem("token");
            const response = await authenticationService.updateUser(data, token);
            console.log(response);
            toast.success(response.message);
            setUserInfo(response);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleShowPassword = (data) => {
        if (data === 1) {
            setOpenEyeOne(!openEyeOne);
        }
        if (data === 2) {
            setOpenEyeTwo(!openEyeTwo);
        }
        if (data === 3) {
            setOpenEyeThree(!openEyeThree);
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

                            <div className="flex-content">
                                <div className="person-info">
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Tên nhân viên: </span>
                                            <span className="element-value">{userInfo.fullName}</span>
                                        </label>
                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Mã nhân viên: </span>
                                            <span className="element-value">{userInfo.userCode}</span>
                                        </label>
                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Ngày sinh: </span>
                                            <span className="element-value">{userInfo.dateOfBirth}</span>

                                        </label>
                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Giới tính: </span>
                                            <span className="element-value">
                                                    {userInfo?.gender === 0 ? "Nam" : userInfo.gender === 1 ? "Nữ" : "Khác"}
                                                </span>

                                        </label>
                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Email: </span>
                                            <span className="element-value">{userInfo.email}</span>
                                        </label>
                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Địa chỉ: </span>
                                            <span className="element-value">{userInfo.address}</span>
                                        </label>
                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Số điện thoại: </span>
                                            <span className="element-value">{userInfo.phoneNumber}</span>
                                        </label>

                                    </div>
                                    <div className="info-element">
                                        <label>
                                            <span className={"element-title"}>Chức vụ: </span>
                                            <span className="element-value">
                                                        {userInfo.role?.roleName === "ROLE_MANAGER" ? "Quản lý cửa hàng"
                                                            : userInfo.role?.roleName === "ROLE_WAREHOUSE" ? "Quản lý kho"
                                                                : "Nhân viên bán hàng"}
                                                </span>
                                        </label>
                                    </div>
                                </div>
                                <form className="form-operation" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-element">
                                        <label>Tên tài khoản: </label>
                                        <input type="text" {...register("username")}
                                               disabled name="username"/>
                                    </div>
                                    <div className="old-password form-element">
                                        <label>Mật khẩu cũ: </label>
                                        <span className="inputValue">
                                        <input type={openEyeOne ? "text" : "password"} name="oldPassword" {...register("oldPassword")}/>
                                            {openEyeOne ? <FaEye onClick={() => handleShowPassword(1)}/>
                                            : <FaEyeSlash onClick={() => handleShowPassword(1)}/>}
                                        </span>
                                        <p className="validate-error"></p>
                                    </div>
                                    <div className="new-password form-element">
                                        <label>Mật khẩu mới: </label>
                                        <span className="inputValue">
                                            <input type={openEyeTwo ? "text" : "password"} name="newPassword" {...register("newPassword")}/>
                                            {openEyeTwo ? <FaEye onClick={() => handleShowPassword(2)}/>
                                                : <FaEyeSlash onClick={() => handleShowPassword(2)}/>}
                                        </span>
                                        <p className="validate-error"></p>
                                    </div>
                                    <div className="confirm-password form-element">
                                        <label>Nhập lại mật khẩu: </label>
                                        <span className="inputValue">
                                        <input type={openEyeThree ? "text" : "password"} name="confirmPassword" {...register("confirmPassword", {
                                            validate: value => value === getValues('newPassword') || "Mật khẩu không trùng khớp!"
                                        })}/>
                                            {openEyeThree ? <FaEye onClick={() => handleShowPassword(3)}/>
                                                : <FaEyeSlash onClick={() => handleShowPassword(3)}/>}
                                        </span>
                                        {errors.confirmPassword &&
                                            <p style={{
                                                color: "red",
                                                fontSize: "16px"
                                            }}>{errors.confirmPassword.message}</p>}
                                    </div>
                                    <div className="form-element">
                                        <button type="submit" className="btn-submit">
                                            Đổi mật khẩu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}