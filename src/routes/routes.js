import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/ErrorPage/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { PersonInfo } from '../pages/Dashboard/PersonInfo/PersonInfo';
import { EmployeeList } from "../pages/Dashboard/EmployeeManagement/EmployeeList";
import { EmployeeCreate } from "../pages/Dashboard/EmployeeManagement/EmployeeCreate";
import CustomerCreate from '../pages/Dashboard/Customer/CustomerCreate';
import CustomerUpdate from '../pages/Dashboard/Customer/CustomerUpdate';

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
    path: '/dashboard/infor',
    element: <PersonInfo />,
    private: true,
  },
  {
    path: '/dashboard/employee',
    element: <EmployeeList />,
    private: true,
  },
  {
    path: '/dashboard/employee/create',
    element: <EmployeeCreate />,
    private: true,
  },
  {
    path: '/dashboard/employee/create/:id',
    element: <EmployeeCreate />,
    private: true,
  },
  {
    path: '/dashboard/customer/create',
    element: <CustomerCreate />,
    private: true,
  },
  {
    path: '/dashboard/customer/update',
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