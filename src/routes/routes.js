import { Routes, Route} from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { PersonInfo } from '../pages/Dashboard/PersonInfo/PersonInfo';
function Approutes(props) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/infor" element={<PersonInfo />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Approutes;