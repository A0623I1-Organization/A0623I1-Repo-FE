import styles from './MainProductDetail.module.scss'

function MainProductDetail(props) {
    return (
        <main id={styles.main}>
            <section className={styles.sectionOne}>
                <div className={styles.item}>
                    <img src="https://m.yodycdn.com/fit-in/filters:format(webp)/100/438/408/products/tsn6176-tr1-7.jpg?v=1690163487050" alt="" />
                </div>
                <div className={styles.item}>
                    <b>T-shirt Nữ Dáng Rộng In Ignite Bột Ngô</b>
                    <p>Mã sản phẩm: TSN6176-TR1-S</p>
                    <p>Size: M</p>
                    <p>Màu: Trắng</p>
                    <p>Số lượng còn lại: 100</p>
                    <p>Giá: 150.000 VND</p>
                </div>
            </section>
        </main>
    );
}

export default MainProductDetail;