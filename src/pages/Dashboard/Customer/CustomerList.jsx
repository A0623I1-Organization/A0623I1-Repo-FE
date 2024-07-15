import React from 'react';

function CustomerList(props) {
    return (
        <div>
            <div className="content-element">
                <div className="box-content">
                    <div className="box-content-header">
                        <h2>Danh sách khách hàng</h2><br/>
                    </div>
                    <div className="flex-box">
                        <div className="search-header">
                            <input className="form-control search-bar" type="search" placeholder="Search...."
                                   aria-label="Search"/>
                        </div>
                        <div className="button-crud">
                            <a href="#addCustomerModal" className="btn btn-success" data-toggle="modal">
                                <i className="material-icons">&#xE147;</i>
                                <span>Add New Customer</span>
                            </a>
                            <a href="#deleteCustomerModal" className="btn btn-danger" data-toggle="modal"
                               onclick="openModal()">
                                <i className="material-icons">&#xE15C;</i>
                                <span>Delete</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="box-content">
                    <table className="table box-element">
                        <thead>
                        <tr>
                            <th>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="selectAll"/>
                                        <label htmlFor="selectAll"></label>
                                    </span>
                            </th>
                            <th>No</th>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Birthday</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Point</th>
                            <th>Step</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                        <label htmlFor="checkbox1"></label>
                                    </span>
                            </td>
                            <td>KH0001</td>
                            <td>0001</td>
                            <td>Nguyễn Trần Yến Nhi</td>
                            <td>Đà Nẵng</td>
                            <td>02/04/2002</td>
                            <td>0123456789</td>
                            <td>Nữ</td>
                            <td>yennhi@mail.com</td>
                            <td>580</td>
                            <td>VIP</td>
                            <td>
                                <a href="#editCustomerModal" className="edit" data-toggle="modal"><i
                                    className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteCustomerModal" className="delete" data-toggle="modal"
                                   onclick="openModal()"><i
                                    className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox2" name="options[]" value="2"/>
                                        <label htmlFor="checkbox2"></label>
                                    </span>
                            </td>
                            <td>KH0002</td>
                            <td>0002</td>
                            <td>Nguyễn Hoàng Yến</td>
                            <td>Đà Nẵng</td>
                            <td>11/11/2002</td>
                            <td>0123456789</td>
                            <td>Nữ</td>
                            <td>hoangnhi@mail.com</td>
                            <td>300</td>
                            <td>VIP</td>
                            <td>
                                <a href="#editCustomerModal" className="edit" data-toggle="modal"><i
                                    className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteCustomerModal" className="delete" data-toggle="modal"
                                   onclick="openModal()"><i
                                    className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox3" name="options[]" value="3"/>
                                        <label htmlFor="checkbox3"></label>
                                    </span>
                            </td>
                            <td>KH0003</td>
                            <td>0003</td>
                            <td>Huỳnh Anh Thư</td>
                            <td>Đà Nẵng</td>
                            <td>26/03/2002</td>
                            <td>0123456789</td>
                            <td>Nữ</td>
                            <td>thuhuynh@mail.com</td>
                            <td>150</td>
                            <td>Bình thường</td>
                            <td>
                                <a href="#editCustomerModal" className="edit" data-toggle="modal"><i
                                    className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteCustomerModal" className="delete" data-toggle="modal"
                                   onclick="openModal()"><i
                                    className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="checkbox4" name="options[]" value="4"/>
                                        <label htmlFor="checkbox4"></label>
                                    </span>
                            </td>

                            <td>KH0004</td>
                            <td>0004</td>
                            <td>Ngô Thị Mỹ Lanh</td>
                            <td>Đà Nẵng</td>
                            <td>19/04/2002</td>
                            <td>0123456789</td>
                            <td>Nữ</td>
                            <td>mylanh@mail.com</td>
                            <td>210</td>
                            <td>Bình thường</td>
                            <td>
                                <a href="#editCustomerModal" className="edit" data-toggle="modal"><i
                                    className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteCustomerModal" className="delete" data-toggle="modal"
                                   onclick="openModal()"><i
                                    className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div/>
            <div/>
        </div>
    );
}

export default CustomerList;