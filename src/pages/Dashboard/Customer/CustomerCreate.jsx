import { DashboardMain } from '../../../components/Dashboard/DashboardMain';
import './Customer.scss'
function CustomerCreate() {
    return (
        <DashboardMain 
            content={
                <main id="main">
                <h2>Thêm mới khách hàng</h2>
                <div className="create">
                    <form action="" className="form">
                        <div className="item1">
                            <label htmlFor="">
                                <span>Mã khách hàng</span>
                                <input type="text" name="" placeholder="" />
                            </label>
                            <label htmlFor="">
                                <span>Giới tính</span>
                                <select name="" id="">
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                    <option value="">Khác</option>
                                </select>
                            </label>
                            <label htmlFor="">
                                <span>Họ tên</span>
                                <input type="text" name="" placeholder="" />
                            </label>
                            <label htmlFor="">
                                <span>Số điện thoại</span>
                                <input type="text" name="" placeholder="" />
                            </label>
                            <label htmlFor="">
                                <span>Ngày sinh</span>
                                <input type="date" name="" placeholder="" />
                            </label>
                            <label htmlFor="">
                                <span>Email</span>
                                <input type="text" name="" placeholder="" />
                            </label>
                            <label htmlFor="">
                                <span>Địa chỉ</span>
                                <input type="text" name="" placeholder="" />
                            </label>
                        </div>
                        <div className="item2">
                            <input type="submit" className="btn add" defaultValue="Thêm" />
                            <input type="button" className="btn cancel" defaultValue="Hủy" />
                        </div>
                    </form>
                </div>
            </main>
            }
        />

    );
}

export default CustomerCreate;