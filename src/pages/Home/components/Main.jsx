import React from 'react';
import Slick from '../../../components/Slick/Slick';
import styles from './Main.module.scss';
import ZaloChat from '../../../ui/ZaloChat';
import { useState, useEffect } from 'react';
import * as ProductService from '../../../services/products/ProductService'
import { fCurrency } from '../../../utils/format-number';
import Loading from '../../../ui/Loading';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../../../data';

function Main(props) {

    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [productsKeyWord, setProductsKeyWord] = useState([]);
    const [productsNew, setProductsNew] = useState([]);
    const [page, setPage] = useState(0);
    const [pageKeyWord, setPageKeyWord] = useState(0);
    const [pageNew, setPageNew] = useState(0);
    const [hasMoreKeyWord, setHasMoreKeyWord] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [hasMoreNew, setHasMoreNew] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [initialLoadKeyWord, setInitialLoadKeyWord] = useState(true);
    const [initialLoadNew, setInitialLoadNew] = useState(true);

    const urlParams = new URLSearchParams(location.search);
    const keyword = urlParams.get('keyword');

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

    useEffect(() => {
        getProductsbyKeyword()
    }, [initialLoadKeyWord, keyword]);

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

    const loadMoreProductsKeyWord = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const response = await ProductService.searchProduct(keyword, pageKeyWord)
        if (!response || !response.content) {
            setHasMoreKeyWord(false);
        } else {
            setProductsKeyWord(prevProducts => [...prevProducts, ...response.content]);
            setPageKeyWord(prevPage => prevPage + 1);
            if (response.last) {
                setHasMoreKeyWord(false);
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

    const getProductsbyKeyword = async () => {
        if (keyword === '') {
            return;
        }
        try {
            const response = await ProductService.searchProduct(keyword, 0)
            if (response.length == 0) {
                setProductsKeyWord([])
                setHasMoreKeyWord(false);
                return;
            }
            if (!response || !response.content) {
                setHasMoreKeyWord(false);
            } else {
                setProductsKeyWord(response.content);
                setPageKeyWord(1);
                if (response.last) {
                    setHasMoreKeyWord(false);
                }
            }

            setLoading(false);
            setInitialLoadKeyWord(false);
        } catch (e) {
            console.log("Không có dữ liệu");
        }
    }

    return (
        <main id={styles.main}>
            <section><Slick /></section>
            <section className={styles.sectionCategory}>
                <ul>
                    {categories?.map((category, index) => (
                        <li key={index}>
                            <Link to={category.link}>
                                <img src={category.src} alt={`Category ${index + 1}`} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            {/* --------Sản phẩm theo keyword-------- */}
            {
                keyword &&
                <section className={styles.sectionList}>
                    <h3>Sản phẩm {keyword}</h3>
                    <div className={styles.list}>
                        {productsKeyWord?.map(product => (
                            product.pricingList?.length > 0 &&
                            <div className={styles.item} key={product.productId}>
                                <Link to={`/product/${product?.productId}`}>
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
                                </Link>
                            </div>
                        ))}
                    </div>
                    {loading && <Loading />}
                    {hasMoreKeyWord && !loading &&
                        (<button className={styles.button}>
                            <a onClick={loadMoreProductsKeyWord}>Xem thêm</a>
                        </button>)
                    }
                    {
                        productsKeyWord?.length == 0 && !loading &&
                        (<p style={{ display: "block", textAlign: "center" }}>Không tìm thấy sản phẩm nào !</p>)
                    }
                </section>
            }


            {/* ----------------------------- */}

            {/* Sản phẩm thời trang nam nữ */}
            <section className={styles.sectionList}>
                <h3>Thời trang nam nữ</h3>
                <div className={styles.list}>
                    {products?.map(product => (
                        product.pricingList?.length > 0 &&
                        <div className={styles.item} key={product.productId}>
                            <Link to={`/product/${product?.productId}`}>
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
                            </Link>
                        </div>
                    ))}
                </div>
                {loading && <Loading />}
                {hasMore && !loading &&
                    (<button className={styles.button}>
                        <a onClick={loadMoreProducts}>Xem thêm</a>
                    </button>)
                }
                {
                    products?.length == 0 && !loading &&
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
                    {productsNew?.map(product => (
                        product.pricingList?.length > 0 &&
                        <div className={styles.item} key={product.productId}>
                            <Link to={`/product/${product?.productId}`}>
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
                            </Link>
                        </div>
                    ))}
                </div>
                {loading && <Loading />}
                {hasMoreNew && !loading && pageNew != 2 &&
                    (<button className={styles.button}>
                        <a onClick={loadMoreProductsNew}>Xem thêm</a>
                    </button>)
                }
                {
                    productsNew?.length == 0 && !loading &&
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