import { useEffect, useState } from "react";
import './warehouse.scss';
import * as pricingService from '../../../../services/products/pricing-service';
import {NavLink, useLocation, useParams} from "react-router-dom";
import DownloadImageFromFireBase from "../../../../firebase/DownloadImageFromFireBase";
import { DashboardMain } from "../../../../components/Dashboard/DashboardMain";

export const PricingView = () => {
    const {role} = useParams();
    const {state} = useLocation()
    const [pricings, setPricings] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [ascending, setAscending] = useState(true);
    const [clickCount, setClickCount] = useState(0); // Biến đếm số lần click


    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    useEffect(() => {
        getAllPricingByProductId(state?.productId, keyword, sortBy, ascending, page);
    }, [state?.productId, sortBy, ascending, page]);


    const getAllPricingByProductId = (productId, pageNumber) => {
        pricingService.getAllPricingByProductId(productId, pageNumber).then(res => {
            setPricings(res.content);
            console.log(res.content)
            console.log(res.totalPages)
            setTotalPages(res.totalPages);
        })
            .catch(err => console.error("Error fetching pricings: ", err));
    };


    const handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const getPageNumbers = () => {
        const maxPagesToShow = 2;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 0;
            endPage = totalPages - 1;
        } else {
            const middlePage = Math.floor(maxPagesToShow / 2);
            if (page <= middlePage) {
                startPage = 0;
                endPage = maxPagesToShow - 1;
            } else if (page + middlePage >= totalPages) {
                startPage = totalPages - maxPagesToShow;
                endPage = totalPages - 1;
            } else {
                startPage = page - middlePage;
                endPage = page + middlePage;
            }
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            setAscending(!ascending);
        }else {
            setSortBy(columnName);
            setAscending(true);
        }
        // Tăng biến đếm lần click
        setClickCount(clickCount + 1);
    };

    useEffect(() => {
        // Nếu click lần thứ ba, reset lại các trạng thái
        if (clickCount === 3) {
            setSortBy('');
            setAscending(true);
            setClickCount(0); // Đặt lại biến đếm lần click về 0
        }
    }, [clickCount]);

    const getSortIndicator = (columnName) => {
        if (sortBy === columnName) {
            return ascending ? <span>&#9650;</span> : <span>&#9660;</span>;
        }
        return null;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getAllPricingByProductId(state?.productId, keyword, sortBy, ascending, page);
    };

    return (
        <DashboardMain path={role} content={
            <div className="content-body">
                <div>
                    <div className="nav-link-container">
                        <NavLink className="nav-link" to={`/dashboard/${role}/create-pricing`}>Thêm Hàng Hóa</NavLink>
                    </div>
                    <div className="header-search">
                        <form onSubmit={handleSearch}>
                            <input type="text" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <div className="data-table">
                        <table>
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th onClick={() => handleSort('pricingCode')}>
                                    Mã hàng
                                    {getSortIndicator('pricingCode')}
                                </th>
                                <th onClick={() => handleSort('pricingName')}>
                                    Tên
                                    {getSortIndicator('pricingName')}
                                </th>
                                <th onClick={() => handleSort('quantity')}>
                                    Số Lượng
                                    {getSortIndicator('quantity')}
                                </th>
                                <th onClick={() => handleSort('size')}>
                                    Size
                                    {getSortIndicator('size')}
                                </th>
                                <th>Ảnh</th>
                                <th onClick={() => handleSort('color.colorName')}>
                                    Màu
                                    {getSortIndicator('color.colorName')}
                                </th>
                                <th>QR Code</th>
                                <th onClick={() => handleSort('price')}>
                                    Đơn giá
                                    {getSortIndicator('price')}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {pricings.length === 0 ? <tr><td colSpan="9" className='container'>Không có kết quả</td></tr> :
                                pricings.map((item, index) => (
                                    <tr key={item.pricingCode}>
                                        <td>{index + 1}</td>
                                        <td>{item.pricingCode}</td>
                                        <td>{item.pricingName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.size}</td>
                                        <td><DownloadImageFromFireBase key={index} imagePath={item.pricingImgUrl} /></td>
                                        <td>{item.color.colorName}</td>
                                        <td><DownloadImageFromFireBase key={index} imagePath={item.qrCode} /></td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button onClick={handlePrevious} hidden={page === 0}>Previous</button>
                        {getPageNumbers().map(pageNum => (
                            <button key={pageNum} onClick={() => setPage(pageNum)} className={pageNum === page ? 'active' : ''}>
                                {pageNum + 1}
                            </button>
                        ))}
                        <button onClick={handleNext} hidden={page === totalPages - 1}>Next</button>
                    </div>
                </div>
            </div>
        } />
    );
};
export default PricingView;
