import { BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/global.scss';
//Thư viện tạo hiệu ứng 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Approutes from './routes/routes';
AOS.init();

function App() {
  return (
    <Router>
      <Approutes />
    </Router>
  );
}

export default App;
