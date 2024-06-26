import { Routes, Route} from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { PersonInfo } from '../pages/Dashboard/PersonInfo/PersonInfo';
import ImportPricing from '../components/Inventory/ImportPricing'
import Statistic from '../components/Statistic/Statistic';
import StatisticByChart from '../components/Statistic/StatisticByChart';
import * as authenticationService from "../services/auth/AuthenticationService";

function Approutes(props) {
    const isAuthenticated = authenticationService.isAuthenticated();

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/dashboard/import' element={<ImportPricing/>}/>
            <Route path='/statistic' element={<Statistic/>}/>
            <Route path='/statistic/chart' element={<StatisticByChart/>}/>
            {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
            {isAuthenticated && <Route path="/dashboard/infor" element={<PersonInfo />} />}
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Approutes;