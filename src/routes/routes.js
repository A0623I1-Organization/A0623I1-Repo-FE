import { Routes, Route} from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { PersonInfo } from '../pages/Dashboard/PersonInfo/PersonInfo';
import * as authenticationService from "../services/auth/AuthenticationService";
import {EmployeeList} from "../pages/Dashboard/EmployeeManagement/EmployeeList";
import {EmployeeCreate} from "../pages/Dashboard/EmployeeManagement/EmployeeCreate";

function Approutes(props) {
    const isAuthenticated = authenticationService.isAuthenticated();

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {isAuthenticated? <Route path="/dashboard" element={<Dashboard />} />
                : <Route path="/dashboard" element={<LoginPage />} />}
            {isAuthenticated? <Route path="/dashboard/infor" element={<PersonInfo />} />
            : <Route path="/dashboard/infor" element={<LoginPage />} />}
            <Route path="/dashboard/employee-list" element={<EmployeeList />} />
            <Route path="/dashboard/employee-create" element={<EmployeeCreate />} />
            <Route path="/dashboard/employee-create/:id" element={<EmployeeCreate />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Approutes;