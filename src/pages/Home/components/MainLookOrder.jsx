import styles from './MainLookOrder.module.scss'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function MainLookOrder(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id={styles.main}>
            <h3>Tra cứu lịch sử mua hàng</h3>
            <div className={styles.mainLookOrder}>
                <form className={styles.form}>
                    <div className={styles.search}>
                        <input type="text" placeholder="Mã hóa đơn *" />
                        <input type="text" placeholder='Số điện thoại khách hàng *' />
                        <button type="submit">Tìm kiếm</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default MainLookOrder;