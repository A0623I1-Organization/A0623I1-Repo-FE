import React from 'react';
// import '../HomePage.scss'
import Slick from '../../../components/Slick/Slick';
import styles from './Main.module.scss';
import ZaloChat from '../../../components/ui/ZaloChat';

function Main(props) {
    return (
        <main id={styles.main}>
            <section><Slick /></section>
            <section className={styles.sectionCategory}>
                <ul>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/8339c19d-1fe8-43fc-8a0d-474c9de17ca7.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/9d7afcef-aa32-4dc3-9c43-5f61cec4e502.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/bd5d9f39-2571-4ddc-9d57-5bbbafcc34c9.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/72c29cbe-5cdb-4853-9d38-e1079a86e35e.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/d083eb5e-0b3f-4138-8676-007768eae0ea.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/909fa1d0-6b99-4747-857e-d5e18c3270ad.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/f6c00282-fd0f-47c0-a376-4a1fa9896152.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/342843e8-9b96-486c-a45b-55884d0fcd92.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/3bbb07ba-875a-4e73-978d-b1ad0df666c9.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/c2838748-5038-4b3f-95f3-7e262a2e7b36.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/75c4fe5f-e6ea-4a12-91a2-f26afaea6ef8.png"
                            alt=""
                        />
                    </li>
                    <li>
                        <img
                            src="https://media-fmplus.cdn.vccloud.vn/uploads/categories/e87112ef-d67c-4fe3-9c28-f40b95a57e62.png"
                            alt=""
                        />
                    </li>
                </ul>
            </section>
            <section className={styles.sectionList}>
                <h3>Sản phẩm mới</h3>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/acn7004-cam-6.jpg?v=1714533314633"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>215.000 VND</p>
                                <p>Áo nữ</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-the-thao-nam-stm7061-nav-1.jpg?v=1716339691437"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>238.000 VND</p>
                                <p>Áo nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/chan-vay-nu-cvn7090-bee-1.jpg?v=1716514305477"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>232.000 VND</p>
                                <p>Váy</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/quan-au-nu-qan7028-ghd-1.jpg?v=1716514232277"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>345.000 VND</p>
                                <p>Quần nữ</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-the-thao-nam-stm7073-xam-1.jpg?v=1716273108157"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>135.000 VND</p>
                                <p>Áo nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/bo-do-nam-bdm7019-den-1.jpg?v=1715658507877"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>435.000 VND</p>
                                <p>Đồ bộ nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-so-mi-nam-scm7047-tit-1-yodyvn.jpg?v=1715654545740"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/chan-vay-nu-yody-cvn7058-nau-1.jpg?v=1716343150110"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Váy</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/vay-dam-tre-em-tay-bong-yody-vak7110-hog-1.jpg?v=1715048679403"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>135.000 VND</p>
                                <p>Đồ trẻ em</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-polo-nam-yody-apm7217-tit-4.jpg?v=1716167973680"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>275.000 VND</p>
                                <p>Áo nam</p>
                            </figcaption>
                        </a>
                    </div>
                </div>
                <button className={styles.button}>
                    <a href="#!">Xem thêm</a>
                </button>
            </section>
            <section className={styles.sectionBanner1}>
                <img
                    src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/48773c7d-80e2-4207-8ccc-ad79b804397a.png"
                    alt=""
                />
            </section>
            <section className={styles.sectionList}>
                <h3>Sản phẩm áo</h3>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-yoguu-retro-yody-gut7058-bee-sjn3052-xnh-11.jpg?v=1709608715057"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo thun nữ</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/gut7050-tra-qsm6037-tan-5.jpg?v=1710487363020"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-thun-nu-yoguu-co-cao-yodygut7028-nau-sjn6004-xah-3.jpg?v=1708998641850"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo nữ</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/gut7056-den-3.jpg?v=1709691727563"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo nam đi chơi</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/sam6045-nav-3.jpg?v=1715055609597"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/cvn5096-den-apn5046-ddo-1.jpg?v=1690163788930"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo thun nữ</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-polo-nam-cafe-yody-apm7187-nau-qsm6029-tit-5.jpg?v=1711444822920"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo thun nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/apm5083-vag-6.jpg?v=1702607264500"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo thun nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/ao-polo-nam-yody-apm7053-ghd-qkm6013-vag-3.jpg?v=1705630093473"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo thun nam</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/large/100/438/408/products/smm3010-gsa-qam3002-xad-8.jpg?v=1692606393950"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <p>235.000 VND</p>
                                <p>Áo sơ mi nam</p>
                            </figcaption>
                        </a>
                    </div>
                </div>
                <button className={styles.button}>
                    <a href="#!">Xem thêm</a>
                </button>
            </section>
            <section className={styles.sectionBanner2}>
                <img
                    className={styles.item1}
                    src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/9ada03d4-6b3f-4a28-a7e0-646d0ace64e9.png"
                    alt=""
                />
                <img
                    className={styles.item2}
                    src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/dae37b8a-67be-4b3c-ae52-cc6c17c0fa91.png"
                    alt=""
                />
            </section>
            <section className={styles.sectionNews}>
                <div className={styles.top}>
                    <h3>Tin tức thời trang</h3>
                    <a href="#!">Xem thêm ›</a>
                </div>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://media-fmplus.cdn.vccloud.vn/uploads/news/82c29cf3-62b5-4dad-ae3a-83c7f6354689.jpeg"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Set đồ đi cưới cho nam</b>
                                <p>Việc lựa chọn trang phục phù hợp khi tham dự đám cưới ...</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://media-fmplus.cdn.vccloud.vn/uploads/news/c505effc-e4e4-495a-9281-e9a09b906761.jpg"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>20+ Kiểu Tóc Ngắn Layer Nữ Đẹp</b>
                                <p>Tóc ngắn layer nữ là kiểu tóc có khả năng biến hóa theo ...</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://media-fmplus.cdn.vccloud.vn/uploads/news/dde7c15b-6576-4110-be0b-1ff3cf08c195.png"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Thời trang nam phong cách trẻ</b>
                                <p>
                                    Thời trang nam là lĩnh vực khá đa dạng về phong cách và kiểu dáng
                                    ...{" "}
                                </p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src="https://media-fmplus.cdn.vccloud.vn/uploads/news/ed56c5fa-ed68-4440-b821-4ab4a3c578fb.jpg"
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>15+ Cách Phối Màu Quần Áo Nam Như Stylist</b>
                                <p>Những món đồ bình dân, giá rẻ cũng sẽ trở nên cao cấp ...</p>
                            </figcaption>
                        </a>
                    </div>
                </div>
            </section>
            <ZaloChat />
        </main>
    );
}

export default Main;