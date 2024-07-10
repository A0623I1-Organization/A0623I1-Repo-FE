import styles from './News.module.scss'

const newsList = [
    {
        id: 1,
        title: 'Đai phong của tennis đ��ng cấp',
        image: 'https://example.com/image1.jpg',
        description: 'Tennis đ��ng cấp đã đầu tư vào phát triển các đại phong mới nhất.',
        content: 'Nội dung',
        categotype: {
            id: 1,
            name: 'Thiết kế'
        } 
    },
    {
        id: 2,
        title: 'M�� phẩm tinh túy của tennis',
        image: 'https://example.com/image2.jpg',
        description: 'M�� phẩm tinh túy của tennis đã đưa đến cho khách hàng tận hư��ng những tinh hoa và nét đ��p của thiết kế.',
        content: 'Nội dung',
        categotype: {
            id: 2,
            name: 'Thiết kế'
        }
    },
    {
        id: 3,
        title: 'Câu lạc bộ tennis của năm 2022',
        image: 'https://example.com/image3.jpg',
        description: 'Câu lạc bộ tennis của năm 2022 đã đưa đến cho khách hàng những câu lạc bộ đang nổi b',
        content: 'Nội dung',
        categotype: {
            id: 3,
            name: 'Thiết kế'
        }
    },
    {
        id: 4,
        title: 'Thông tin về tennis đang phát triển',
        image: 'https://example.com/image4.jpg',
        description: 'Thông tin về tennis đang phát triển của các nhà tuyển thủ đã đưa đến cho khách hàng những ý tưởng và kinh nghiệm mới',
        content: 'Nội dung',
        categotype: {
            id: 4,
            name: 'Thiết kế'
        }
    },
]


function MainNews(props) {
    return (
        <main id={styles.main}>
            <section className={styles.section}>
                <h2>Thời trang nam</h2>
                <div className={styles.list}>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src=""
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Tiêu đề</b>
                                <p>Mô tả</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src=""
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Tiêu đề</b>
                                <p>Mô tả</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src=""
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Tiêu đề</b>
                                <p>Mô tả</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src=""
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Tiêu đề</b>
                                <p>Mô tả</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src=""
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Tiêu đề</b>
                                <p>Mô tả</p>
                            </figcaption>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <a href="#!">
                            <figure>
                                <img
                                    src=""
                                    alt="post"
                                    width="100%"
                                />
                            </figure>
                            <figcaption>
                                <b>Tiêu đề</b>
                                <p>Mô tả</p>
                            </figcaption>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainNews;