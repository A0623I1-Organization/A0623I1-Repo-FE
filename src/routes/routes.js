import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/ErrorPage/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
import {PersonInfo} from '../pages/Dashboard/PersonInfo/PersonInfo';
import {WareHouse} from "../pages/Dashboard/content/warehouse/WareHouse";
import CreatePricing from "../pages/Dashboard/content/warehouse/product/CreatePricing";
import PricingView from "../pages/Dashboard/content/warehouse/PricingView";
import BillForm from "../pages/Dashboard/content/bill/BillForm";
import {EmployeeList} from "../pages/Dashboard/EmployeeManagement/EmployeeList";
import {EmployeeCreate} from "../pages/Dashboard/EmployeeManagement/EmployeeCreate";
import CustomerCreate from '../pages/Dashboard/Customer/CustomerCreate';
import CustomerUpdate from '../pages/Dashboard/Customer/CustomerUpdate';
import {Dashboard} from "../pages/Dashboard/Dashboard";
import ImportPricing from '../components/Inventory/ImportPricing';
import {NotificationList} from "../pages/Dashboard/Notification/NotificationList";
import Loading from '../ui/Loading';
import ProductDetail from '../pages/Home/ProductDetail';
import {NotificationCreate} from "../pages/Dashboard/Notification/NotificationCreate";

const routes = [
    {
        path: '/',
        element: <HomePage/>,
        exact: true,
    },
    {
        path: '/product/:productId',
        element: <ProductDetail/>,
    },
    {
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
        private: true,
    },
    {
        path: '/dashboard/:role/warehouse',
        element: <WareHouse/>,
        private: true,
    },
    {
        path: '/dashboard/pricingView',
        element: <PricingView/>,
        private: true,
    },
    {
        path: '/dashboard/:role/create-pricing',
        element: <CreatePricing/>,
        private: true,
    },
    {
        path: '/dashboard/import-pricing',
        element: <ImportPricing/>,
        private: true
    },
    {
        path: '/dashboard/:role/payment',
        element: <BillForm/>,
        private: true,
    },
    {
        path: '/dashboard/:role/infor',
        element: <PersonInfo/>,
        private: true,
    },
    {
        path: '/dashboard/:role/employee-list',
        element: <EmployeeList/>,
        private: true,
    },
    {
        path: '/dashboard/:role/employee-create',
        element: <EmployeeCreate/>,
        private: true,
    },
    {
        path: '/dashboard/:role/employee-create/:id',
        element: <EmployeeCreate/>,
        private: true,
    },
    {
        path: '/dashboard/:role/customer/create',
        element: <CustomerCreate/>,
        private: true,
    },
    {
        path: '/dashboard/:role/customer/update/:id',
        element: <CustomerUpdate/>,
        private: true,
    },
    {
        path: '/news',
        element: <NewsPage/>,
    },
    {
        path: '/dashboard/salesman/notification',
        element: <NotificationList />,
        private: true,
    },
    {
        path: '/dashboard/warehouse/notification',
        element: <NotificationList />,
        private: true,
    },
    {
        path: '/dashboard/storeManager/notification',
        element: <NotificationCreate />,
        private: true,
    },
    {
        path: '/test',  // Ai muốn test thử gì thì dùng đường dẫn này
        element: <Loading/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    },
];

export default routes;