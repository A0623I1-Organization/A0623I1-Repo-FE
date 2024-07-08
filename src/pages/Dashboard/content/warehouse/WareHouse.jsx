import { HeaderDashboard } from "../../../../components/Header/HeaderDashboard";
import { SidebarDashboard } from "../../../../components/Sidebar/SidebarDashboard";
import { useEffect, useState } from "react";
import './warehouse.scss';
import * as productService from '../../../../services/products/product-service';
import { NavLink, useNavigate } from "react-router-dom";
import DownloadImageFromFireBase from "../../../../firebase/DownloadImageFromFireBase";
import { DashboardMain } from "../../../../components/Dashboard/DashboardMain";

export const WareHouse = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [ascending, setAscending] = useState(true); // true for ascending, false for descending

    // Function to toggle sidebar visibility
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    // Function to fetch products based on page number, keyword, sortBy, and ascending
    useEffect(() => {
        getAllProduct(page, keyword, sortBy, ascending);
    }, [page, keyword, sortBy, ascending]);

    const getAllProduct = (pageNumber, keyword, sortBy, ascending) => {
        productService.getAllProduct(keyword, sortBy, ascending, pageNumber)
            .then(res => {
                setProducts(res.content);
                setTotalPages(res.totalPages);
            })
            .catch(err => console.error("Error fetching products: ", err));
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
        navigate(`/dashboard/pricingView`, { state: { productId: productId } })
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
    const handleSort = (columnName) => {
        if (sortBy === columnName) {
            setAscending(!ascending);
        } else {
            setSortBy(columnName);
            setAscending(true);
        }
    };
    const getSortIndicator = (columnName) => {
        if (sortBy === columnName) {
            return ascending ? <span>&#9650;</span> : <span>&#9660;</span>;
        }
        return null;
    };
    const handleSearch = (keyword)=>{

    }

    return (
        <DashboardMain content={
            <div className="content-body">
                <div className="nav-link-container">
                    <NavLink className="nav-link" to='/dashboard/create-pricing'>Thêm Hàng Hóa</NavLink>
                </div>
                <div className="header-search">
                    {/* Header search content */}
                    <input type="text" placeholder="Search..." onChange={(e)=>setKeyword(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="data-table">
                    {/* Data table content */}
                    <table>
                        <thead>
                        <tr>
                            <th>
                                STT
                            </th>
                            <th onClick={() => handleSort('productCode')}>
                                Mã hàng
                                {getSortIndicator('productCode')}
                            </th>
                            <th onClick={() => handleSort('productName')}>
                                Tên
                                {getSortIndicator('productName')}
                            </th>
                            <th onClick={() => handleSort('description')}>
                                Mô tả
                                {getSortIndicator('description')}
                            </th>
                            <th onClick={() => handleSort('productType.category.categoryName')}>
                                Loại
                                {getSortIndicator('productType.category.categoryName')}
                            </th>
                            <th onClick={() => handleSort('productType.typeName')}>
                                Danh mục
                                {getSortIndicator('productType.typeName')}
                            </th>
                            <th>
                                Pricing
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.length === 0 ? <tr><td colSpan="7" className='container'>Không có kết quả</td></tr> :
                            products?.map((item, index) => (
                                <tr key={item.productId}>
                                    <td>{index + 1}</td>
                                    <td>{item.productCode}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.description}</td>
                                    <td>{item.productType.category.categoryName}</td>
                                    <td>{item.productType.typeName}</td>
                                    <td><a onClick={() => showView(item.productId)} style={{ color: 'green', padding: '5px' }}>Pricing in {item.productName}</a></td>
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
        } />
    );
};
