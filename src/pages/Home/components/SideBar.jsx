import React from 'react';
import styles from './SideBar.module.scss'
import { useState } from 'react';

function SideBar({status}) {
    const sendDataToParent = () => {
        status(false);
      };

    return (
        <aside id={styles.sidebar}>
            <div className={styles.menuSidebar}>
                <div className={styles.menuTop}>
                    <h2>FM</h2>
                    <button className={styles.button} onClick={sendDataToParent}>
                        X
                    </button>
                </div>
                <div className={styles.menuContent}>
                    <ul>
                        <li>Nam</li>
                        <li>Nữ</li>
                        <li>Đồ đôi</li>
                        <li>Trẻ em</li>
                        <li>Sale</li>
                    </ul>
                </div>
                <div className={styles.menuBottom}>
                    <ul>
                        <li>Tư vấn Zalo</li>
                        <li>Đăng nhập</li>
                        <li>Đơn hàng của tôi</li>
                        <li>Hệ thống cửa hàng</li>
                        <li>Chính sách hỗ trợ</li>
                        <li>Bộ sưu tập</li>
                        <li>Tin tức</li>
                    </ul>
                </div>
            </div>
        </aside>

    );
}

export default SideBar;