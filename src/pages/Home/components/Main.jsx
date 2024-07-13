import React from 'react';
import Slick from '../../../components/Slick/Slick';
import styles from './Main.module.scss';
import ZaloChat from '../../../ui/ZaloChat';
import { useState, useEffect } from 'react';
import * as ProductService from '../../../services/products/PricingService'
import { fCurrency } from '../../../utils/format-number';
import Loading from '../../../ui/Loading';

function Main(props) {

    const [products, setProducts] = useState([]);
    const [productsNew, setProductsNew] = useState([]);
    const [page, setPage] = useState(0);
    const [pageNew, setPageNew] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [hasMoreNew, setHasMoreNew] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); // Trạng thái để kiểm tra lần tải đầu tiên
    const [initialLoadNew, setInitialLoadNew] = useState(true); // Trạng thái để kiểm tra lần tải đầu tiên

    useEffect(() => {
        if (initialLoad) {
            loadInitialProducts();
        }
    }, [initialLoad]);

    useEffect(() => {
        if (initialLoadNew) {
            loadInitialProductsNew();
        }
    }, [initialLoadNew]);

    const loadInitialProducts = async () => {
        setLoading(true);

        const response = await ProductService.getAll(0);
        if (!response || !response.content) {
            setHasMore(false);
        } else {
            setProducts(response.content);
            setPage(1);
            if (response.last) {
                setHasMore(false);
            }
        }

        setLoading(false);
        setInitialLoad(false);
    };

    const loadInitialProductsNew = async () => {
        setLoading(true);

        const response = await ProductService.getAllNew(0);
        if (!response || !response.content) {
            setHasMoreNew(false);
        } else {
            setProductsNew(response.content);
            setPageNew(1);
            if (response.last) {
                setHasMoreNew(false);
            }
        }

        setLoading(false);
        setInitialLoadNew(false);
    };

    const loadMoreProducts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        const response = await ProductService.getAll(page);
        if (!response || !response.content) {
            setHasMore(false);
        } else {
            setProducts(prevProducts => [...prevProducts, ...response.content]);
            setPage(prevPage => prevPage + 1);
            if (response.last) {
                setHasMore(false);
            }
        }

        setLoading(false);
    };

    const loadMoreProductsNew = async () => {
        if (loading || !hasMoreNew) return;

        setLoading(true);

        const response = await ProductService.getAllNew(pageNew);
        if (!response || !response.content) {
            setHasMoreNew(false);
        } else {
            setProductsNew(prevProducts => [...prevProducts, ...response.content]);
            setPageNew(prevPage => prevPage + 1);
            if (response.last) {
                setHasMoreNew(false);
            }
        }

        setLoading(false);
    };

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
            {/* Sản phẩm thời trang nam nữ */}
            <section className={styles.sectionList}>
                <h3>Thời trang nam nữ</h3>
                <div className={styles.list}>
                    {products.map(product => (
                        <div className={styles.item} key={product.productId}>
                            <a href="#!">
                                <figure>
                                    <img
                                        src={product.productImages[0]?.imageUrl}
                                        alt={product.productName}
                                        width="100%"
                                    />
                                </figure>
                                <figcaption>
                                    <p>{fCurrency(product.pricingList[0]?.price)} VND</p>
                                    <p>{product.productName}</p>
                                </figcaption>
                            </a>
                        </div>
                    ))}
                </div>
                {console.log(products)}
                {loading && <Loading />}
                {hasMore && !loading &&
                    (<button className={styles.button}>
                        <a href="#!" onClick={loadMoreProducts}>Xem thêm</a>
                    </button>)
                }
                {
                    products.length === 0 && !loading &&
                    (<p style={{ display: "block", textAlign: "center" }}>Không tìm thấy sản phẩm nào !</p>)
                }
            </section>
            {/* ----------------------------- */}
            <section className={styles.sectionBanner1}>
                <img
                    src="https://media-fmplus.cdn.vccloud.vn/uploads/sliders/48773c7d-80e2-4207-8ccc-ad79b804397a.png"
                    alt=""
                />
            </section>
            {/* Sản phẩm mới */}
            <section className={styles.sectionList}>
                <h3>Sản phẩm mới</h3>
                <div className={styles.list}>
                    {productsNew.map(product => (
                        <div className={styles.item} key={product.productId}>
                            <a href="#!">
                                <figure>
                                    <img
                                        src={product.productImages[0]?.imageUrl}
                                        alt={product.productName}
                                        width="100%"
                                    />
                                </figure>
                                <figcaption>
                                    <p>{fCurrency(product.pricingList[0]?.price)} VND</p>
                                    <p>{product.productName}</p>
                                </figcaption>
                            </a>
                        </div>
                    ))}
                </div>
                {loading && <Loading />}
                {hasMoreNew && !loading && pageNew !== 2 &&
                    (<button className={styles.button}>
                        <a href="#!" onClick={loadMoreProductsNew}>Xem thêm</a>
                    </button>)
                }
                {
                    productsNew.length === 0 && !loading &&
                    (<p style={{ display: "block", textAlign: "center" }}>Không tìm thấy sản phẩm nào !</p>)
                }
            </section>
            {/* -------------------------------- */}
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