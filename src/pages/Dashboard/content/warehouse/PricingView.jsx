import {useEffect, useState} from "react";
import './warehouse.scss';
import * as pricingService from '../../../../services/products/pricing-service';
import {NavLink, useLocation} from "react-router-dom";
import DownloadImageFromFireBase from "../../../../firebase/DownloadImageFromFireBase";
import {DashboardMain} from "../../../../components/Dashboard/DashboardMain";

export const PricingView = () => {
    const {state} = useLocation()
    const [pricings, setPricings] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

    // Function to toggle sidebar visibility
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    useEffect(() => {
        console.log(state.productId)
        console.log(page)
        getAllPricingByProductId(state.productId, page)

    }, [state.productId, page]);
    const getAllPricingByProductId = (productId, pageNumber) => {
        pricingService.getAllPricinByProductId(productId, pageNumber).then(res => {
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
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    const sortedPricings = () => {
        let sortablePricings = [...pricings];
        if (sortConfig.key) {
            sortablePricings.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortablePricings;
    };

    return (
        <DashboardMain content={
            <div className="content-body">
                <div>
                    <div className="nav-link-container">
                        <NavLink className="nav-link" to='/dashboard/create-pricing'>Thêm Hàng Hóa</NavLink>
                    </div>
                    <div className="header-search">
                        {/* Header search content */}
                        <input type="text" placeholder="Search..."/>
                        <button>Search</button>
                    </div>
                    <div className="data-table">
                        {/* Data table content */}
                        <table>
                           <thead>
                           <tr>

                                   <th>STT</th>
                                   <th onClick={() => requestSort('pricingCode')}>
                                       Mã hàng
                                       {getClassNamesFor('pricingCode') === 'ascending' && <span>&#9650;</span>}
                                       {getClassNamesFor('pricingCode') === 'descending' && <span>&#9660;</span>}
                                   </th>
                                   <th onClick={() => requestSort('pricingName')}>
                                       Tên
                                       {getClassNamesFor('pricingName') === 'ascending' && <span>&#9650;</span>}
                                       {getClassNamesFor('pricingName') === 'descending' && <span>&#9660;</span>}
                                   </th>
                                   <th onClick={() => requestSort('quantity')}>
                                       Số Lượng
                                       {getClassNamesFor('quantity') === 'ascending' && <span>&#9650;</span>}
                                       {getClassNamesFor('quantity') === 'descending' && <span>&#9660;</span>}
                                   </th>
                                   <th onClick={() => requestSort('size')}>
                                       Size
                                       {getClassNamesFor('size') === 'ascending' && <span>&#9650;</span>}
                                       {getClassNamesFor('size') === 'descending' && <span>&#9660;</span>}
                                   </th>
                                   <th>ảnh</th>
                                   <th onClick={() => requestSort('color.colorName')}>
                                       Màu
                                       {getClassNamesFor('color.colorName') === 'ascending' && <span>&#9650;</span>}
                                       {getClassNamesFor('color.colorName') === 'descending' && <span>&#9660;</span>}
                                   </th>
                                   <th>QR Code</th>
                                   <th onClick={() => requestSort('price')}>
                                       Đơn giá
                                       {getClassNamesFor('price') === 'ascending' && <span>&#9650;</span>}
                                       {getClassNamesFor('price') === 'descending' && <span>&#9660;</span>}
                                   </th>

                           </tr>
                           </thead>
                        <tbody>
                        {pricings.length === 0 ? <h3 className='container'>Không có kết quả</h3> :
                            sortedPricings().map((item, index) => (
                                <tr key={item.pricingCode}>
                                    <td>{index + 1}</td>
                                    <td>{item.pricingCode}</td>
                                    <td>{item.pricingName}</td>
                                    <td>{item.quantity}</td>
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
                        <button key={pageNum} onClick={() => setPage(pageNum)}
                                className={pageNum === page ? 'active' : ''}>
                            {pageNum + 1}
                        </button>
                    ))}
                    <button onClick={handleNext} hidden={page === totalPages - 1}>Next</button>
                </div>
            </div>
            </div>
        }/>
    );
};
export default PricingView;