import { HeaderDashboard } from "../../../components/Header/HeaderDashboard";
import { SidebarDashboard } from "../../../components/Sidebar/SidebarDashboard";
import { useEffect, useState } from "react";
import './warehouse.scss';
import * as pricingService from '../../../services/products/pricing-service';
import {NavLink, useLocation} from "react-router-dom";
import DownloadImageFromFireBase from "../../../firebase/DownloadImageFromFireBase";

export const PricingView = () => {
    const {state} = useLocation()
    const [pricings, setPricings] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Function to toggle sidebar visibility
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    useEffect(() => {
        console.log(state.productId)
        console.log(page)
        getAllPricingByProductId(state.productId,page)

    }, [state.productId,page]);
    const getAllPricingByProductId = (productId,pageNumber) => {
        pricingService.getAllPricinByProductId(productId,pageNumber).then(res => {
                        setPricings(res.content);
            console.log(res.content)
            console.log(res.totalPages)
                        setTotalPages(res.totalPages);
                    })
                    .catch(err => console.error("Error fetching pricings: ", err));
    }

    // Handler for previous page button
    const handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    // Handler for next page button
    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };


    // Function to generate array of page numbers for pagination
    const getPageNumbers = () => {
        const maxPagesToShow = 2; // Adjust this number to show more/less page buttons
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

    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction} />
            <div className="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar} />
                <div className="app-content">
                    <div className="content-body">
                        <div className="nav-link-container">
                            <NavLink className="nav-link" to='/create-pricing'>Thêm Hàng Hóa</NavLink>
                        </div>
                        <div className="header-search">
                            {/* Header search content */}
                            <input type="text" placeholder="Search..." />
                            <button>Search</button>
                        </div>
                        <div className="data-table">
                            {/* Data table content */}
                            <table>
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã hàng</th>
                                    <th>Tên</th>
                                    <th>Số Lượng</th>
                                    <th>Size</th>
                                    <th>ảnh</th>
                                    <th>Màu</th>
                                    <th>Mã QR</th>
                                    <th>Đơn giá</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pricings?.map((item, index) => (
                                    <tr key={item.pricingCode}>
                                        <td>{index + 1}</td>
                                        <td>{item.pricingCode}</td>
                                        <td>{item.pricingName}</td>
                                        <td>{item.inventory}</td>
                                        <td>{item.size}</td>
                                        <td><DownloadImageFromFireBase key={index} imagePath={item.pricingImgUrl}/></td>
                                        <td>{item.color.colorName}</td>
                                        <td><DownloadImageFromFireBase key={index} imagePath={item.qrCode}/></td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination">
                            {/* Pagination buttons */}
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
            </div>
        </div>
    );
};
export default PricingView;