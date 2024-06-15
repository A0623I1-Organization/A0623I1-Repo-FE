import { Routes, Route} from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import NewsPage from '../pages/News/NewsPage';
function Approutes(props) {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/dashboard" element={< />} /> */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Approutes;