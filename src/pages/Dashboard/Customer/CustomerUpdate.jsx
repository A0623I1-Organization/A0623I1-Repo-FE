import React from 'react';
import { useState } from 'react';
import { DashboardMain } from '../../../components/Dashboard/DashboardMain';
import ModalDelete from '../../../ui/ModalDelete';

function CustomerUpdate() {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleSubmit = () => {
        console.log('Xác nhận');
        closeModal();
    };

    return (
        <DashboardMain
            content={
                <main id="main">
                    <h2>Sửa khách hàng</h2>
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
                                <label htmlFor="">
                                    <span>Điểm</span>
                                    <input type="text" name="" placeholder="" />
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
                                <input type="submit" className="btn add" defaultValue="Sửa" />
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
                    <ModalDelete isOpen={isModalOpen} onClose={closeModal} title={"Xóa khách hàng"} content={"Xác nhận xóa khách hàng A"} submit={handleSubmit} />
                </main>
                
            }
        />
    );
}

export default CustomerUpdate;