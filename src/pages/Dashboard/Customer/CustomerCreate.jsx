import { DashboardMain } from '../../../components/Dashboard/DashboardMain';
import './Customer.scss'
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify";
import * as CustomerService from '../../../services/customer/CusromerService'
function CustomerCreate() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await CustomerService.createCustomer(data);
            console.log(data);
            // reset();
            toast.success("Thêm mới khách hàng thành công")
        } catch (e) {
            toast.error("Thêm khách hàng thất bại")
            console.log(e)
            return;
        }
    };


    return (
        <DashboardMain
            content={
                <main id="main-customer">
                    <h2>Thêm mới khách hàng</h2>
                    <div className="create">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="item1">
                                <label htmlFor="">
                                    <span>Mã khách hàng</span>
                                    <input type="text" placeholder=""  {...register("customerCode", {})} />
                                    {/* <small>Mã khách hàng không hợp lệ!</small> */}
                                </label>
                                <label htmlFor="">
                                    <span>Giới tính</span>
                                    <select id="" {...register("gender", {})}>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                        <option value="2">Khác</option>
                                    </select>
                                </label>
                                <label htmlFor="">
                                    <span>Họ tên</span>
                                    <input type="text" {...register("customerName", {})} placeholder="" />
                                </label>
                                <label htmlFor="">
                                    <span>Số điện thoại</span>
                                    <input type="text" {...register("phoneNumber", {})} placeholder="" />
                                </label>
                                <label htmlFor="">
                                    <span>Ngày sinh</span>
                                    <input type="date" {...register("dateOfBirth", {})} placeholder="" />
                                </label>
                                <label htmlFor="">
                                    <span>Email</span>
                                    <input type="text" {...register("email", {})} placeholder="" />
                                </label>
                                <label htmlFor="">
                                    <span>Địa chỉ</span>
                                    <input type="text" {...register("address", {})} placeholder="" />
                                </label>
                            </div>
                            <div className="item2">
                                <input type="submit" className="btn add" value="Thêm" />
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