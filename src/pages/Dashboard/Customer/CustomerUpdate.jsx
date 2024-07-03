import { useState ,useEffect} from 'react';
import { DashboardMain } from '../../../components/Dashboard/DashboardMain';
import './Customer.scss'
import { useForm } from 'react-hook-form';
import {toast} from "react-toastify";
import * as CustomerService from '../../../services/customer/CusromerService'
import ModalDelete from '../../../ui/ModalDelete';
import { useParams } from 'react-router-dom';

function CustomerUpdate() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [customer, setCustomer] = useState(null);
    const { register, handleSubmit,setValue ,reset, formState: { errors } } = useForm();
    const {id} = useParams()
    
    useEffect(() => {
        getCustomer()
    }, []);

    useEffect(() => {
        if(customer !== null){
            setValue('customerCode', customer?.customerCode);
            setValue('customerName', customer?.customerName);
            setValue('dateOfBirth', customer?.dateOfBirth);
            setValue('gender', customer?.gender);
            setValue('email', customer?.email);
            setValue('phoneNumber', customer?.phoneNumber);
            setValue('address', customer?.address);
            setValue('accumulatedPoints', customer?.accumulatedPoints);
        }
    }, [customer]);

    const getCustomer = async() => {
        try {
            const response = await CustomerService.findById(id);
            setCustomer(response);
        } catch (e) {
            console.log(e);
        }
    }
    
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSubmitDelete = () => {
        closeModal();
    };

    const onSubmit = async (data) => {
        try {
            await CustomerService.updateCustomer(id,data);
            // reset();
            toast.success("Sửa khách hàng thành công")
        } catch (e) {
            toast.error(`${e}`)
        }
    };

    return (
        <DashboardMain
            content={
                <main id="main-customer">
                    <h2>Sửa khách hàng</h2>
                    <div className="create">
                        <form  className="form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="item1">
                                <label htmlFor="">
                                    <span>Mã khách hàng</span>
                                    <input type="text" {...register("customerCode", {})} placeholder="" />
                                </label>
                                <label htmlFor="">
                                    <span>Giới tính</span>
                                    <select {...register("gender", {})}>
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
                                <label htmlFor="">
                                    <span>Điểm</span>
                                    <input type="text" {...register("accumulatedPoints", {})} placeholder="" />
                                </label>
                                <label htmlFor="">
                                    <span>Cấp bậc</span>
                                    <select name="" id="">
                                        <option value="">VIP</option>
                                        <option value="">VIP 1</option>
                                        <option value="">VIP 2</option>
                                    </select>
                                </label>
                            </div>
                            <div className="item2">
                                <input type="submit" className="btn add" value="Sửa" />
                                <input
                                    onClick={openModal}
                                    type="button"
                                    className="btn delete"
                                    defaultValue="Xóa"
                                />
                                <input type="button" className="btn cancel" defaultValue="Hủy" />
                            </div>
                        </form>
                    </div>
                    <ModalDelete isOpen={isModalOpen} onClose={closeModal} title={"Xóa khách hàng"} content={"Xác nhận xóa khách hàng A"} submit={handleSubmitDelete} />
                </main>
                
            }
        />
    );
}

export default CustomerUpdate;