import {Link} from "react-router-dom";

import logo from "./logo.png";
import "./login.scss";

function LoginPage(props) {

    return (
        <div className="container">
            <div className="header">
                <div className="logo-brand">
                    <img src={logo} alt="logo"/>
                    <span>Đăng nhập</span>
                </div>
                <div className="middle-part"></div>
                <div className="right-part">
                    <Link to={"/dashboard"} >Quay lại trang chủ</Link>
                </div>
            </div>
            <div className="content">
                <div className="box">
                    <div className="form-box">
                        <div className="form sign_in">
                            <h3>Đăng nhập</h3>
                            <form action="#" id="form_input">
                                <div className="type">
                                    <input
                                        type="text"
                                        className="login-input"
                                        placeholder="Username"
                                        name=""
                                        id="username"
                                    />
                                    <div className="popup">
                                        <p className="validate-error">
                                            Tên đăng nhập hoặc mật khẩu không đúng!!!
                                        </p>
                                    </div>
                                </div>
                                <div className="type">
                                    <input
                                        type="password"
                                        className="login-input"
                                        placeholder="Password"
                                        name=""
                                        id="password"
                                    />
                                </div>
                                <div className="remember-me-and-forgot">
                                    <label>
                                        <input type="checkbox" name="remember" defaultValue="true"/>
                                        Ghi nhớ đăng nhập
                                    </label>
                                    <a href="#">Quên mật khẩu?</a>
                                </div>
                                <button className="btn bkg">Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                    <div className="overlay">
                        <div className="page page_signIn">
                            <h3>Rất vui được gặp lại bạn!</h3>
                            <p>Hãy đăng nhập để khám phá những điều mới mẻ</p>
                        </div>
                        <div className="page page_signUp">
                            <h3>Hello Friend!</h3>
                            <p>Enter your personal details and start journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="footer">
                <div className="footer-main">
                    <div className="item">
                        <h3>Về chúng tôi</h3>
                        <ul>
                            <li>Giới thiệu</li>
                            <li>Liên hệ</li>
                            <li>Hệ thống cửa hàng</li>
                            <li>Tuyển dụng</li>
                        </ul>
                    </div>
                    <div className="item">
                        <h3>Trung tâm trợ giúp</h3>
                        <ul>
                            <li>Hướng dẫn mua hàng</li>
                            <li>Hướng dẫn chọn size</li>
                            <li>Chính sách Bảo hành &amp; Đổi trả</li>
                            <li>Chính sách khách hàng thành viên</li>
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách bảo mật &amp; chia sẻ thông tin</li>
                            <li>Câu hỏi thường gặp</li>
                        </ul>
                    </div>
                    <div className="item">
                        <h3>Liên hệ</h3>
                        <ul>
                            <li>Phone: +84 123 456 789</li>
                        </ul>
                        <ul>
                            <li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width={100}
                                    height={100}
                                    viewBox="0 0 50 50"
                                >
                                    <path
                                        d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
                                </svg>
                            </li>
                            <li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width={100}
                                    height={100}
                                    viewBox="0 0 50 50"
                                >
                                    <path
                                        d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 15.576172 6 C 12.118043 9.5981082 10 14.323627 10 19.5 C 10 24.861353 12.268148 29.748596 15.949219 33.388672 C 15.815412 33.261195 15.988635 33.48288 16.005859 33.875 C 16.023639 34.279773 15.962689 34.835916 15.798828 35.386719 C 15.471108 36.488324 14.785653 37.503741 13.683594 37.871094 A 1.0001 1.0001 0 0 0 13.804688 39.800781 C 16.564391 40.352722 18.51646 39.521812 19.955078 38.861328 C 21.393696 38.200845 22.171033 37.756375 23.625 38.34375 A 1.0001 1.0001 0 0 0 23.636719 38.347656 C 26.359037 39.41176 29.356235 40 32.5 40 C 36.69732 40 40.631169 38.95117 44 37.123047 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 18.496094 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 34.804688 C 40.72689 36.812719 36.774644 38 32.5 38 C 29.610147 38 26.863646 37.459407 24.375 36.488281 C 22.261967 35.634656 20.540725 36.391201 19.121094 37.042969 C 18.352251 37.395952 17.593707 37.689389 16.736328 37.851562 C 17.160501 37.246758 17.523335 36.600775 17.714844 35.957031 C 17.941109 35.196459 18.033096 34.45168 18.003906 33.787109 C 17.974816 33.12484 17.916946 32.518297 17.357422 31.96875 L 17.355469 31.966797 C 14.016928 28.665356 12 24.298743 12 19.5 C 12 14.177406 14.48618 9.3876296 18.496094 6 z M 32.984375 14.986328 A 1.0001 1.0001 0 0 0 32 16 L 32 25 A 1.0001 1.0001 0 1 0 34 25 L 34 16 A 1.0001 1.0001 0 0 0 32.984375 14.986328 z M 18 16 A 1.0001 1.0001 0 1 0 18 18 L 21.197266 18 L 17.152344 24.470703 A 1.0001 1.0001 0 0 0 18 26 L 23 26 A 1.0001 1.0001 0 1 0 23 24 L 19.802734 24 L 23.847656 17.529297 A 1.0001 1.0001 0 0 0 23 16 L 18 16 z M 29.984375 18.986328 A 1.0001 1.0001 0 0 0 29.162109 19.443359 C 28.664523 19.170123 28.103459 19 27.5 19 C 25.578848 19 24 20.578848 24 22.5 C 24 24.421152 25.578848 26 27.5 26 C 28.10285 26 28.662926 25.829365 29.160156 25.556641 A 1.0001 1.0001 0 0 0 31 25 L 31 22.5 L 31 20 A 1.0001 1.0001 0 0 0 29.984375 18.986328 z M 38.5 19 C 36.578848 19 35 20.578848 35 22.5 C 35 24.421152 36.578848 26 38.5 26 C 40.421152 26 42 24.421152 42 22.5 C 42 20.578848 40.421152 19 38.5 19 z M 27.5 21 C 28.340272 21 29 21.659728 29 22.5 C 29 23.340272 28.340272 24 27.5 24 C 26.659728 24 26 23.340272 26 22.5 C 26 21.659728 26.659728 21 27.5 21 z M 38.5 21 C 39.340272 21 40 21.659728 40 22.5 C 40 23.340272 39.340272 24 38.5 24 C 37.659728 24 37 23.340272 37 22.5 C 37 21.659728 37.659728 21 38.5 21 z"></path>
                                </svg>
                            </li>
                            <li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width={100}
                                    height={100}
                                    viewBox="0 0 50 50"
                                >
                                    <path
                                        d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div className="item">
                        <h3>Đăng ký nhận tin từ FM</h3>
                        <ul>
                            <li>
                                <label>
                                    <input type="text" placeholder="Nhập địa chỉ Email"/>
                                    <button>Đăng ký</button>
                                </label>
                            </li>
                            <li/>
                        </ul>
                        <h3>Tải ứng dụng của chúng tôi tại:</h3>
                        <ul>
                            <li>
                                <img
                                    src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1614438298pUvmvqiaXbF1eA4.png"
                                    style={{maxWidth: 120}}
                                    alt=""
                                />
                            </li>
                            <li>
                                <img
                                    src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1614438295yeEDycl0E6dCNv9.png"
                                    style={{maxWidth: 120}}
                                    alt=""
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© Bản quyền thuộc về A0623I1</p>
                </div>
            </footer>
        </div>
    );
}

export default LoginPage;