import {HeaderDashboard} from "../../../components/Header/HeaderDashboard";
import {SidebarDashboard} from "../../../components/Sidebar/SidebarDashboard";
import {useState} from "react";


export function PersonInfo() {

    const [isShowSidebar, setIsShowSidebar] = useState(false);

    const callbackFunction = (childData) => {
        setIsShowSidebar(childData)
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
                                <table className="person-info">
                                    <tbody>
                                    <tr>
                                        <th>Tên nhân viên</th>
                                        <td>Nguyễn Văn A</td>
                                    </tr>
                                    <tr>
                                        <th>Mã nhân viên</th>
                                        <td>0123456789</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày sinh</th>
                                        <td>01/02/0123</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ</th>
                                        <td>Hoà Khánh, Đà Nẵng</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại</th>
                                        <td>0123456789</td>
                                    </tr>
                                    </tbody>
                                </table>
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