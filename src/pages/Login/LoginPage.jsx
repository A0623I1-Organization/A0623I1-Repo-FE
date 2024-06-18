import {Link} from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./LoginPage.scss";
import FooterHome from "../../components/Footer/FooterHome";

function LoginPage(props) {

    return (
        <div id="login-page">
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
            <FooterHome />
        </div>
    );
}

export default LoginPage;