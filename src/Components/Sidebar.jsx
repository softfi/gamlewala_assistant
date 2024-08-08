import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/gamla/logo-gw-wbg.png"

const Sidebar = () => {
  // NAVBAR TOGGLING STATE
  const [navToggler, setNavToggler] = useState();
  // SIDEBAR MENUS STATE
  const [menus, setMenus] = useState(false);

  useEffect(() => {
    setNavToggler({
      ...navToggler,
      iconSidenav: document.getElementById("iconSidenav"),
      body: document.querySelector(".g-sidenav-show"),
      className: "g-sidenav-pinned",
    });
    // fetchSidebar();
  }, []);

  // SIDEBAR TOGGLING METHOD
  function toggleSidenav() {
    if (navToggler?.body?.classList?.contains(navToggler?.className)) {
      navToggler?.body?.classList?.remove(navToggler?.className);
    } else {
      navToggler?.body?.classList?.add(navToggler?.className);
      navToggler?.iconSidenav?.classList?.remove("d-none");
    }
  }

  return (
    <React.Fragment>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white position-absolute end-0 top-0 d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
            onClick={toggleSidenav}
          ></i>
          <Link className="navbar-brand m-0 text-center" to="/dashboard">
            <div className="w-100">
              <img
                src={logo}
                className="w-50 object-fit-cover"
                alt="logo"
              />
            </div>
            <br></br>
            <h5 className="font-weight-bold text-white text-center">
              Vertical Head Panel
            </h5>
          </Link>
        </div>
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link  " to="/dashboard">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-home"></i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#application"
                className="nav-link collapsed"
                aria-controls="application"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-desktop"></i>
                </div>
                <span className="nav-link-text ms-1">Application</span>
              </a>
              <div className="collapse" id="application">
                <ul className="nav ms-4 ps-3">
                  {/* <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#user"
                      className="nav-link collapsed"
                      aria-controls="user"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Users</span>
                    </a>
                    <div className="collapse" id="user">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/users">
                            <span className="sidenav-mini-icon"> UL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Users List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/users/user"
                          >
                            <span className="sidenav-mini-icon"> AU </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Users{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  {/* <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#segment"
                      className="nav-link collapsed"
                      aria-controls="segment"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Segment</span>
                    </a>
                    <div className="collapse" id="segment">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/segments">
                            <span className="sidenav-mini-icon"> SL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Segments List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/segments/segment"
                          >
                            <span className="sidenav-mini-icon"> AU </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Segment{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#category"
                      className="nav-link collapsed"
                      aria-controls="category"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Category</span>
                    </a>
                    <div className="collapse" id="category">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/categories">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Category List{" "}
                            </span>
                          </Link>
                        </li>
                        {/* <li className="nav-item ">
                          <Link
                            className="nav-link"
                            to="/categories/category"
                          >
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Category{" "}
                            </span>
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              {/* <a
                data-bs-toggle="collapse"
                href="#pages"
                className="nav-link collapsed"
                aria-controls="pages"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-file"></i>
                </div>
                <span className="nav-link-text ms-1">Pages</span>
              </a> */}
              <div className="collapse" id="pages">
                <ul className="nav ms-4 ps-3">
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/notification">
                      <span className="sidenav-mini-icon"> N </span>
                      <span className="sidenav-normal"> Notifications </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/faq">
                      <span className="sidenav-mini-icon"> FAQ </span>
                      <span className="sidenav-normal"> FAQs </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/testimonials">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Testimonials </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/casestudy">
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal"> Case Study </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/skinocare-journey">
                      <span className="sidenav-mini-icon"> SJ </span>
                      <span className="sidenav-normal">
                        {" "}
                        Skin O Care Journey{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/skin&hair">
                      <span className="sidenav-mini-icon"> SH </span>
                      <span className="sidenav-normal"> Skin & Hair </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/privacy-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Privacy Policy </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/refund-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Refund Policy </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/shipping-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Shipping Policy </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/terms-&-conditions">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal">
                        {" "}
                        Terms & Conditions{" "}
                      </span>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#ecommerce"
                className="nav-link collapsed"
                aria-controls="ecommerce"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-store"></i>
                </div>
                <span className="nav-link-text ms-1">E-commerce</span>
              </a>
              <div className="collapse" id="ecommerce">
                <ul className="nav ms-4 ps-3">
                  {/* <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#category"
                      className="nav-link collapsed"
                      aria-controls="category"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text ms-1">Category</span>
                    </a>
                    <div className="collapse" id="category">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/categories">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Category List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/categories/category"
                          >
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Category{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#products"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">Products</span>
                    </a>
                    <div className="collapse" id="products">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/products">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Products List{" "}
                            </span>
                          </Link>
                        </li>
                        {/* <li className="nav-item">
                          <Link className="nav-link " to="/products/product">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              N{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Product{" "}
                            </span>
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                  {/* <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#doctors"
                    >
                      <span className="nav-link-text ms-1">
                        Doctors
                      </span>
                    </a>
                    <div className="collapse" id="doctors">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/doctors">
                            <span className="sidenav-mini-icon"> DL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Doctors List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/doctors/doctor">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AD{" "}
                            </span>
                            <span className="sidenav-normal"> Add Doctor </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#coupons"
                    >
                      <span className="nav-link-text ms-1">
                        Coupons
                      </span>
                    </a>
                    <div className="collapse" id="coupons">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/coupons">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Coupons List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/coupons/coupon">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AC{" "}
                            </span>
                            <span className="sidenav-normal"> Add Coupon </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#explores"
                    >
                      <span className="nav-link-text ms-1">
                        Explore
                      </span>
                    </a>
                    <div className="collapse" id="explores">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/explores">
                            <span className="sidenav-mini-icon"> EL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Explores List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/explores/explore">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AE{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Explore{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#feedbacks"
                    >
                      <span className="nav-link-text ms-1">Feedback</span>
                    </a>
                    <div className="collapse" id="feedbacks">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/feedbacks">
                            <span className="sidenav-mini-icon"> FL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Feedback List{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* -------------------------------------- DOCTORS PANEL -------------------------------------- */}

            {/* <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#doctors-panel"
                className="nav-link collapsed"
                aria-controls="doctors-panel"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-desktop"></i>
                </div>
                <span className="nav-link-text ms-1">Doctors Panel</span>
              </a>
              <div className="collapse" id="doctors-panel">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item ">
                    <Link
                      className="nav-link  "
                      to="/doctors-panel/docs-designation"
                    >
                      <span className="sidenav-normal">
                        {" "}
                        Designation/Position{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#doctors-crud"
                      className="nav-link collapsed"
                      aria-controls="doctors-crud"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text ms-1">Doctors</span>
                    </a>
                    <div className="collapse" id="doctors-crud">
                      <ul className="nav ps-3">
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/doctors"
                          >
                            <span className="sidenav-normal"> Doctors </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/add-doctor"
                          >
                            <span className="sidenav-normal">
                              {" "}
                              Add Doctors{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#regimen"
                      className="nav-link collapsed"
                      aria-controls="regimen"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text ms-1">Regimen</span>
                    </a>
                    <div className="collapse" id="regimen">
                      <ul className="nav ps-3">
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/regimen/symptoms"
                          >
                            <span className="sidenav-normal"> Symptoms </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/regimen/kits"
                          >
                            <span className="sidenav-normal"> Kits </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/regimen/plan"
                          >
                            <span className="sidenav-normal"> Plan </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li> */}

            {/* {menusList} */}
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
