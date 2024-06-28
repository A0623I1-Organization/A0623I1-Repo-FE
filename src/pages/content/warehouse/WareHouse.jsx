import { HeaderDashboard } from "../../../components/Header/HeaderDashboard";
import { SidebarDashboard } from "../../../components/Sidebar/SidebarDashboard";
import { useEffect, useState } from "react";
import './warehouse.scss';
import * as productService from '../../../services/products/product-service';
import {NavLink, useNavigate} from "react-router-dom";
import DownloadImageFromFireBase from "../../../firebase/DownloadImageFromFireBase";

export const WareHouse = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Function to toggle sidebar visibility
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    // Function to fetch pricings based on page number
    useEffect(() => {
        getAllProduct(page);
    }, [page]);

    const getAllProduct= (pageNumber) => {
        productService.getAllProduct(pageNumber)
            .then(res => {
                setProducts(res.content);
                setTotalPages(res.totalPages);
            })
            .catch(err => console.error("Error fetching pricings: ", err));
    };

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
    const showView = (productId) => {
        navigate(`/pricingView`, {state: {productId: productId}})
    }
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
                                    <th>Mô tả</th>
                                    <th>Loại</th>
                                    <th>Danh mục</th>
                                    <th>Ảnh</th>
                                    <th>Pricing</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products?.map((item, index) => (
                                    <tr key={item.productId}>
                                        <td>{index + 1}</td>
                                        <td>{item.productCode}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.productType.category.categoryName}</td>
                                        <td>{item.productType.typeName}</td>
                                        <td>
                                            {
                                                item.productImages?.map((items,index)=>(

                                                    <DownloadImageFromFireBase key={index} imagePath={items?.imageUrl}/>
                                                ))
                                            }
                                        </td>
                                        <td><a onClick={() => showView(item.productId)} style={{color: 'green',padding:'5px'}}>Pricing in {item.productName}</a></td>
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
