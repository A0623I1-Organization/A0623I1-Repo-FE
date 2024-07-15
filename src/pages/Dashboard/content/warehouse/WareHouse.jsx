import { useEffect, useState } from "react";
import './warehouse.scss';
import * as productService from '../../../../services/products/product-service';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import { DashboardMain } from "../../../../components/Dashboard/DashboardMain";
import {BiSolidShow} from "react-icons/bi";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoTrashSharp} from "react-icons/io5";
import {ProductDetailModal} from "./ProductDetailModal";
import ModalDelete from "../../../../ui/ModalDelete";

export const WareHouse = () => {
    const {role} = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [ascending, setAscending] = useState(true); // true for ascending, false for descending
    const [clickCount, setClickCount] = useState(0); // Biến đếm số lần click
    const [productId, setProductId] = useState(null);
    const [productDelete, setProductDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenD, setIsModalOpenD] = useState(false);

    // Function to toggle sidebar visibility
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    // Function to fetch products based on page number, keyword, sortBy, and ascending
    useEffect(() => {
        getAllProduct(keyword,sortBy, ascending,page);
    }, [page,sortBy, ascending]);
    console.log(products)

    const getAllProduct = ( keyword, sortBy, ascending, pageNumber) => {
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
    const openDetailModal = (productId) => {
        setIsModalOpen(true);
        setProductId(productId);
        console.log(productId)
    }
    const openDeleteModal =(productId)=>{
        setIsModalOpenD(true);
        setProductDelete(productId);
        console.log(productId)
    }
    const closeDeleteModal =()=> setIsModalOpenD(false)


    const closeDetailModal = () => setIsModalOpen(false);


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
        // setPage(0);
        getAllProduct( keyword, sortBy, ascending,page);
    };
    const  handleDelete = ()=>{
        productService.deleteProduct(productDelete).then(
            ()=>{
                getAllProduct(keyword,sortBy,ascending,page)
            }
        ).catch(err=>console.log(err))
    }

    return (
        <DashboardMain path={role} content={
            <div className="content-body">
                <div className="nav-link-container">
                    <NavLink className="nav-link" to={`/dashboard/${role}/create-pricing`}>Thêm Hàng Hóa</NavLink>
                </div>
                <div className="header-search">
                    {/* Header search content */}
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Search..."  value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
                        <button onClick={handleSearch}>Search</button>
                    </form>
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
                            <th>
                                Chọn
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
                                    <td className={"edit-emp"}>
                                        <a onClick={() => openDetailModal(item.productId)}>
                                            <BiSolidShow fill="#3dc8d8"/>
                                        </a>
                                        <Link to={`/dashboard/${role}/create-pricing/${item.productId}`}>
                                            <MdOutlineModeEdit fill="#00a762"/>
                                        </Link>
                                        <a onClick={() => openDeleteModal(item.productId)}>
                                            <IoTrashSharp fill="red"/>
                                        </a>
                                    </td>
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
                <ProductDetailModal
                    isOpen={isModalOpen}
                    onClose={closeDetailModal}
                    id={productId}
                />
                <ModalDelete isOpen={isModalOpenD} onClose={closeDeleteModal} title={`Bạn có muốn xóa ${productDelete}`} content={'Bạn hãy xác nhận lại'} submit={(productId)=>handleDelete(productId)} />
            </div>
        } />
    );
};
