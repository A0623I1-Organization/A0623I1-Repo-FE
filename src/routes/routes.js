import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/ErrorPage/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
import { PersonInfo } from '../pages/Dashboard/PersonInfo/PersonInfo';
import {WareHouse} from "../pages/Dashboard/content/warehouse/WareHouse";
import CreatePricing from "../pages/Dashboard/content/warehouse/product/CreatePricing";
import PricingView from "../pages/Dashboard/content/warehouse/PricingView";
import BillForm from "../pages/Dashboard/content/bill/BillForm";
import { EmployeeList } from "../pages/Dashboard/EmployeeManagement/EmployeeList";
import { EmployeeCreate } from "../pages/Dashboard/EmployeeManagement/EmployeeCreate";
import CustomerCreate from '../pages/Dashboard/Customer/CustomerCreate';
import CustomerUpdate from '../pages/Dashboard/Customer/CustomerUpdate';
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
function Approutes(props) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/warehouse" element={<WareHouse/>} />
            <Route path='/pricingView' element={<PricingView/>}/>
            <Route path="/create-pricing" element={<CreatePricing/>} />
            <Route path="/payment" element={<BillForm/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/infor" element={<PersonInfo />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}




const routes = [
  {
    path: '/',
    element: <HomePage />,
    exact: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    private: true,
  },
    {
        path: '/dashboard/warehouse',
        element: <WareHouse />,
        private: true,
    },
    {
        path: '/dashboard/pricingView',
        element: <PricingView />,
        private: true,
    },
    {
        path: '/dashboard/create-pricing',
        element: <CreatePricing />,
        private: true,
    },
    {
        path: '/dashboard/payment',
        element: <BillForm />,
        private: true,
    },
  {
    path: '/dashboard/infor',
    element: <PersonInfo />,
    private: true,
  },
  {
    path: '/dashboard/employee-list',
    element: <EmployeeList />,
    private: true,
  },
  {
    path: '/dashboard/employee-create',
    element: <EmployeeCreate />,
    private: true,
  },
  {
    path: '/dashboard/employee-create/:id',
    element: <EmployeeCreate />,
    private: true,
  },
  {
    path: '/dashboard/customer/create',
    element: <CustomerCreate />,
    private: true,
  },
  {
    path: '/dashboard/customer/update/:id',
    element: <CustomerUpdate />,
    private: true,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;