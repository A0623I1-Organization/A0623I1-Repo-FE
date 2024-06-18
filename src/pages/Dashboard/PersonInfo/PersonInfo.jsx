import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useEffect, useState} from "react";
import * as authenticationService from "../../../services/auth/AuthenticationService";
import {logout} from "../../../services/auth/AuthenticationService";


export function PersonInfo() {
    const [userInfo, setUserInfo] = useState({})

    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
    }

    useEffect(()=> {
        const fetchData = async () => {
            await getUserInfo();
        }
        fetchData();
    }, [])

    const getUserInfo = async () => {
        const temp = await authenticationService.getYourProfile(localStorage.getItem("token"));
        setUserInfo(temp);
    }

    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction}></HeaderDashboard>
            <div id="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar}></SidebarDashboard>
                <div className="app-content">
                    <div className="content-body">

                        <div className="content-element">
                            <div className="flex-content">
                                {userInfo &&
                                <table className="person-info">
                                    <tbody>
                                    <tr>
                                        <th>Tên nhân viên</th>
                                        <td>{userInfo.fullName}</td>
                                    </tr>
                                    <tr>
                                        <th>Mã nhân viên</th>
                                        <td>{userInfo.userCode}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày sinh</th>
                                        <td>{userInfo.dateOfBirth}</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ</th>
                                        <td>{userInfo.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại</th>
                                        <td>{userInfo.phoneNumber}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                }
                                <form className="form-operation">
                                    <div className="old-password form-element">
                                        <label>Mật khẩu cũ: </label>
                                        <input type="text" name="oldPassword"/>
                                        <p className="validate-error">Mật khẩu không đúng!!</p>
                                    </div>
                                    <div className="new-password form-element">
                                        <label>Mật khẩu mới: </label>
                                        <input type="text" name="newPassword"/>
                                        <p className="validate-error">Mật khẩu không đúng định dạng!!</p>
                                    </div>
                                    <div className="confirm-password form-element">
                                        <label>Nhập lại mật khẩu: </label>
                                        <input type="text" name="confirmPassword"/>
                                        <p className="validate-error">Mật khẩu không trùng khớp!</p>
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