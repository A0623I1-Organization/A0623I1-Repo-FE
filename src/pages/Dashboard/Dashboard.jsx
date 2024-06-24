import { DashboardMain } from "../../components/Dashboard/DashboardMain";
import "./Dashboard.scss";

export function Dashboard() {
    return (
        <DashboardMain content={
            <div className="content-body">
                <div className="content-header">
                    <div className="guest box-element">
                        <div className="icon-sta">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={35}
                                height={35}
                                fill="currentColor"
                                className="bi bi-people-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                            </svg>
                        </div>
                        <span className="item-name">Lượng khách</span>
                        <span className="item-number">99999</span>
                        <span className="item-growth">Tăng 70%</span>
                    </div>
                    <div className="orders box-element">
                        <div className="icon-sta">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={35}
                                height={35}
                                fill="currentColor"
                                className="bi bi-list-ol"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"
                                />
                                <path
                                    d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                            </svg>
                        </div>
                        <span className="item-name">Đơn hàng</span>
                        <span className="item-number">99999</span>
                        <span className="item-growth">Tăng 70%</span>
                    </div>
                    <div className="revenue box-element">
                        <span className="item-name">
                            Doanh thu
                            <label>
                                <select>
                                    <option value="">Tuần này</option>
                                    <option value="">Tháng này</option>
                                    <option value="">Năm này</option>
                                </select>
                            </label>
                        </span>
                        <span className="item-number">99999</span>
                        <span className="item-growth">Tăng 70%</span>
                    </div>
                </div>
                <div className="content-element">
                    <div className="box-content">
                        <p>Top nhân viên bán hàng tốt nhất</p>
                        <table className="table top-employee">
                            <thead>
                                <tr>
                                    <th className="emp-name">Họ tên</th>
                                    <th className="emp-price">Giá</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Đinh Văn Khang</td>
                                    <td>99,999,999</td>
                                    <td>4,4444</td>
                                </tr>
                                <tr>
                                    <td>Nguyễn Văn A</td>
                                    <td>88,8888,888</td>
                                    <td>3,333</td>
                                </tr>
                                <tr>
                                    <td>Lê Thị B</td>
                                    <td>77,777,777</td>
                                    <td>2,222</td>
                                </tr>
                                <tr>
                                    <td>Bùi Thị C</td>
                                    <td>66,666,666</td>
                                    <td>1,111</td>
                                </tr>
                                <tr>
                                    <td>Đặng Quang D</td>
                                    <td>55,555,555</td>
                                    <td>1,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="content-element">
                    <div className="box-content">
                        <p>Top 5 đơn hàng mới nhất</p>
                        <ol className="styled-list">
                            <li>
                                <span className="date">24 May 2018</span>
                                <span className="customer-name">Tên khách hàng 1</span>
                            </li>
                            <li>
                                <span className="date">25 May 2018</span>
                                <span className="customer-name">Tên khách hàng 2</span>
                            </li>
                            <li>
                                <span className="date">26 May 2018</span>
                                <span className="customer-name">Tên khách hàng 3</span>
                            </li>
                            <li>
                                <span className="date">27 May 2018</span>
                                <span className="customer-name">Tên khách hàng 4</span>
                            </li>
                            <li>
                                <span className="date">28 May 2018</span>
                                <span className="customer-name">Tên khách hàng 5</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        } />
    );
}