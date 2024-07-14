import styles from './News.module.scss';
import { useEffect } from 'react';

const newsList = [
    {
        id: 1,
        title: 'Set Đồ Đi Đám Cưới Cho Nam: Chi Tiết Cách Phối Tạo Outfit Điểm 10',
        image: 'https://media-fmplus.cdn.vccloud.vn/uploads/news/82c29cf3-62b5-4dad-ae3a-83c7f6354689.jpeg',
        description: 'Tennis đẳng cấp đã đầu tư vào phát triển các đại phong mới nhất.',
        content: 'Nội dung',
        category: {
            id: 1,
            name: 'Thiết kế'
        }
    },
    {
        id: 2,
        title: 'Phối Đồ Với Giày Chelsea Boot Nam: 13 Cách Mix & Match Sành Điệu',
        image: 'https://media-fmplus.cdn.vccloud.vn/uploads/news/9a0e944b-496f-4154-99e0-0599366b9ae8.png',
        description: 'Mẫu phẩm tinh túy của tennis đã đưa đến cho khách hàng tận hưởng những tinh hoa và nét đẹp của thiết kế.',
        content: 'Nội dung',
        category: {
            id: 2,
            name: 'Thiết kế'
        }
    },
    {
        id: 3,
        title: 'Thời Trang Nam Phong Cách Trẻ Trung, Cao Cấp, Giá Tốt Bậc Nhất',
        image: 'https://media-fmplus.cdn.vccloud.vn/uploads/news/dde7c15b-6576-4110-be0b-1ff3cf08c195.png',
        description: 'Câu lạc bộ tennis của năm 2022 đã đưa đến cho khách hàng những câu lạc bộ đang nổi bật.',
        content: 'Nội dung',
        category: {
            id: 3,
            name: 'Thiết kế'
        }
    },
    {
        id: 4,
        title: '10 Phong Cách Thời Trang Nam Trẻ Trung, Năng Động Bậc Nhất',
        image: 'https://media-fmplus.cdn.vccloud.vn/uploads/news/7742e2dd-1dd7-4459-a17e-b532079d7bc0.png',
        description: 'Thông tin về tennis đang phát triển của các nhà tuyển thủ đã đưa đến cho khách hàng những ý tưởng và kinh nghiệm mới.',
        content: 'Nội dung',
        category: {
            id: 4,
            name: 'Thiết kế'
        }
    },
];

function MainNews(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id={styles.main}>
            <section className={styles.section}>
                <h3>Tin tức thời trang</h3>
                <div className={styles.list}>
                    {newsList.map((news) => (
                        <div className={styles.item} key={news.id}>
                            <a href="#!">
                                <figure>
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        width="100%"
                                    />
                                </figure>
                                <figcaption>
                                    <b>{news.title}</b>
                                    <p>{news.description}</p>
                                </figcaption>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default MainNews;
