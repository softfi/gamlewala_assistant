import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../DataTableComponent/Datatable";
import { Tag } from "antd";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import { AddData } from "../../Apis/Setters/AddData";
import useSession, { deleteSession } from "../../hooks/session";
import { EditData } from "../../Apis/Setters/EditData";

const ProductsList = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  //ORDER LIST STATE
  const [productListData, setProductListData] = useState([]);

  const [deleteProductData, setDeleteProductData] = useState(false);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [productDetails, setProductDetails] = useState({})

  // GETTING TOKEN FROM SESSION
  let token = getSession("authorization");

  useEffect(() => {
    AddData({ url: "product/list", token: token })
      .then((res) => {
        setProductListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteProductData]);

  // CHANGE POPUP STATE
  const [approvalStatus, setApprovalStatus] = useState(false);

  // CHANGE POPUP STATE
  const [rejectionStatus, setRejectionStatus] = useState(false);

  // console.log(productListData);

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...productListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "IMAGE",
      key: "url",
      dataIndex: "url",
      render: (_, elem) => (
        <Link href="app-product.html" className="me-4">
          <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
            <img src={elem?.image} width="40" height="40" alt="" />
          </div>
        </Link>
      ),
    },
    {
      title: "PRODUCT",
      key: "name",
      dataIndex: "name",
      ...columnSearchProps("name"),
    },
    {
      title: "CATEGORY",
      dataIndex: ["category", "name"],
      key: "category",
      render: (_, { category }) => (
        <>
          <div className="text-left">
            <span>{category.name}</span>
          </div>
        </>
      ),
    },
    {
      title: "vendor",
      dataIndex: ["vendor", "name"],
      key: "vendor",
      render: (_, { vendor }) => (
        <>
          <div className="text-left">
            <span>{vendor.name}</span>
          </div>
        </>
      ),
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
      ...columnSearchProps("price"),
    },
    {
      title: "MRP",
      key: "mrp",
      dataIndex: "mrp",
      ...columnSearchProps("mrp"),
    },
    {
      title: "APPROVAL",
      key: "status",
      dataIndex: "status",
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          <div className=" text-left">
            <div className="badge bg-primary">
              {elem.status === "pending" ? "Pending" : (elem.status === "approved" ? "Approved" : "Rejected")}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (elem) => (
        <div className=" text-center px-2 py-1">
          <Link
            className="cursor-pointer"
            id="dropdownTable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="fa fa-ellipsis-v text-secondary"
              aria-hidden="true"
            ></i>
          </Link>
          <ul
            className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
            aria-labelledby="dropdownTable"
            data-popper-placement="bottom-start"
          >
            <li>
              <Link
                className="dropdown-item border-radius-md"
                to={"/products/product/" + elem._id}
              >
                Update Details
              </Link>
            </li>
            <li
              onClick={() => {
                setApprovalStatus(!approvalStatus);
                setProductDetails({
                  id: elem._id,
                  mrp: elem.mrp
                });
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Approve
              </Link>
            </li>
            <li
              onClick={() => {
                setRejectionStatus(!rejectionStatus);
                setProductDetails({
                  id: elem._id,
                });
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Reject
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // API CALL METHOD TO DELETE AN ITEM
  // const deleteItem = (id) => {
  //   DeleteData({ url: `product/delete/${id}`, token: token })
  //     .then((res) => {
  //       window.scrollTo(0, 0);
  //       if (res.data.status) {
  //         setAlert({
  //           successStatus: true,
  //           errStatus: false,
  //           successMessage: res?.data?.msg,
  //           errMessage: "",
  //         });
  //         setTimeout(() => {
  //           setAlert({
  //             errStatus: false,
  //             successStatus: false,
  //             errMessage: "",
  //             successMessage: "",
  //           });
  //         }, 1000);
  //         setDeleteProductData((prev) => !prev);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err?.response?.status == "401") {
  //         deleteSession("authorization");
  //         window.location.href = `${process.env.REACT_APP_BASE_URL}`
  //       } else {
  //         window.scrollTo(0, 0);
  //         if (err?.response?.data?.msg) {
  //           console.log(err?.response?.data?.msg);
  //           setAlert({
  //             errStatus: true,
  //             successStatus: false,
  //             errMessage: err?.response?.data?.msg,
  //             successMessage: "",
  //           });
  //           setTimeout(() => {
  //             setAlert({
  //               errStatus: false,
  //               successStatus: false,
  //               errMessage: "",
  //               successMessage: "",
  //             });
  //           }, 2000);
  //         } else {
  //           console.log(err?.message);
  //           setAlert({
  //             errStatus: true,
  //             successStatus: false,
  //             errMessage: err?.message,
  //             successMessage: "",
  //           });
  //           setTimeout(() => {
  //             setAlert({
  //               errStatus: false,
  //               successStatus: false,
  //               errMessage: "",
  //               successMessage: "",
  //             });
  //           }, 2000);
  //         }
  //       }
  //     });
  // };

  // API CALL METHOD TO APPROVE AN ITEM
  const approve = () => {
    const credentials = {
      status: "approved",
      ...productDetails
    }

    EditData({ url: `product/approve`, cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          });
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            });
          }, 1000);
          setApprovalStatus(!approvalStatus);
        }
      })
      .catch((err) => {
        if (err?.response?.status == "401") {
          deleteSession("authorization");
          window.location.href = `${process.env.REACT_APP_BASE_URL}`
        } else {
          window.scrollTo(0, 0);
          if (err?.response?.data?.msg) {
            console.log(err?.response?.data?.msg);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.response?.data?.msg,
              successMessage: "",
            });
            setTimeout(() => {
              setAlert({
                errStatus: false,
                successStatus: false,
                errMessage: "",
                successMessage: "",
              });
            }, 2000);
          } else {
            console.log(err?.message);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.response?.data?.errors,
              successMessage: "",
            });
            setTimeout(() => {
              setAlert({
                errStatus: false,
                successStatus: false,
                errMessage: "",
                successMessage: "",
              });
            }, 2000);
          }
        }
      });
  };

  // API CALL METHOD TO REJECT AN ITEM
  const reject = () => {
    const credentials = {
      status: "rejected",
      ...productDetails
    }

    console.log(credentials)

    EditData({ url: `product/approve`, cred: credentials, token: token })
      .then((res) => {
        setRejectionStatus(!rejectionStatus);
        window.scrollTo(0, 0);
        if (res.data.status) {
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          });
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            });
          }, 1000);
        }
      })
      .catch((err) => {
        setRejectionStatus(!rejectionStatus);
        if (err?.response?.status == "401") {
          deleteSession("authorization");
          window.location.href = `${process.env.REACT_APP_BASE_URL}`
        } else {
          window.scrollTo(0, 0);
          if (err?.response?.data?.msg) {
            console.log(err?.response?.data?.msg);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.response?.data?.msg,
              successMessage: "",
            });
            setTimeout(() => {
              setAlert({
                errStatus: false,
                successStatus: false,
                errMessage: "",
                successMessage: "",
              });
            }, 2000);
          } else {
            console.log(err?.message);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.response?.data?.errors,
              successMessage: "",
            });
            setTimeout(() => {
              setAlert({
                errStatus: false,
                successStatus: false,
                errMessage: "",
                successMessage: "",
              });
            }, 2000);
          }
        }
      });
  };

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
            {/* DISPLAY ERROR MESSAGE */}
            {alert?.errStatus && (
              <div
                className="alert alert-danger alert-dismissible fade show text-black"
                role="alert"
              >
                {alert?.errMessage}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {
                    setAlert({
                      errStatus: false,
                      successStatus: false,
                      errMessage: "",
                      successMessage: "",
                    });
                  }}
                ></button>
              </div>
            )}

            {/* DISPLAY SUCCESS MESSAGE */}
            {alert?.successStatus && (
              <div
                className="alert alert-success alert-dismissible fade show text-black"
                role="alert"
              >
                {alert?.successMessage}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {
                    setAlert({
                      errStatus: false,
                      successStatus: false,
                      errMessage: "",
                      successMessage: "",
                    });
                  }}
                ></button>
              </div>
            )}

            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-md-8">
                    <h6>Products List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  {<Datatable data={data} columns={columns} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFY OR REJECT VIEW */}
      {rejectionStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup">
            <div
              className="newsletter-close-btn"
              onClick={() => setRejectionStatus(!rejectionStatus)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div className="newsletter-inner popup-inner">
              <h3 className="newsletter-heading">Rejection</h3>
              <form onSubmit={reject}>
                <div className="input-area">
                  <div className="input-div">
                    <textarea
                      name="reason"
                      rows={5}
                      value={productDetails.answer}
                      placeholder="Reason"
                      onChange={(e) =>
                        setProductDetails({ ...productDetails, reason: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="subscribe-btn">
                    Reject{" "}
                    <i
                      class="fa fa-long-arrow-right ml--5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* APPROVAL VIEW */}
      {approvalStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup">
            <div
              className="newsletter-close-btn"
              onClick={() => setApprovalStatus(!approvalStatus)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div className="newsletter-inner popup-inner">
              <h3 className="newsletter-heading">Approval</h3>
              <form onSubmit={approve}>
                <div className="input-area">
                  <div className="input-div">
                    <input
                      name="mrp"
                      type="number"
                      value={productDetails.mrp}
                      placeholder="MRP"
                      onChange={(e) =>
                        setProductDetails({ ...productDetails, mrp: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="subscribe-btn">
                    Approve{" "}
                    <i
                      class="fa fa-long-arrow-right ml--5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductsList;
