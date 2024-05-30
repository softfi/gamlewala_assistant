import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams } from "react-router";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import { AddData } from "../../Apis/Setters/AddData";

const EditProduct = () => {
  const params = useParams();
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // RAW CATEGORY LIST DATA
  const [categoriesListData, setCategoriesListData] = useState([]);

  let [details, setDetails] = useState({
    id: params?.id,
    name: "",
    price: "",
    category: "",
    vendorPrice: "",
    mrp: "",
    isActive: "",
  });

  let token = getSession("authorization");

  useEffect(() => {
    GetData({ url: `product/details/${params.id}`, token: token })
      .then((res) => {
        if (res?.data?.status) {
          setDetails({
            id: params?.id,
            name: res?.data?.data?.name,
            price: res?.data?.data?.price,
            category: res?.data?.data?.category?._id,
            vendorPrice: res?.data?.data?.vendorPrice,
            stock: res?.data?.data?.stock,
            mrp:  res?.data?.data?.mrp,
            isActive: "true",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    GetData({ url: "category", token: token })
      .then((res) => {
        setCategoriesListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  // MAPPING CATEGORIES OPTION FOR SELECT
  const categoriesList = categoriesListData
    ?.map((elem) => ({
      label: elem?.name,
      value: elem?._id,
    }));


  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
      const { name, value } = e.target;
      setDetails({
        ...details,
        [name]: value,
      })
  };

  // HANDLING CATEGORIES
  const handleCategories = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        category: value,
      };
    });
  };

  // FILE UPLOAD METHOD(API CALL)
  // const fileUpload = async (e) => {
  //   FileUpload({ image: e.target.files[0] })
  //     .then((res) => {
  //       if (res?.data?.status) {
  //         setDetails({
  //           ...details,
  //           file: res?.data?.data,
  //         });
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


  // HANDLING API CALL METHOD
  const update = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    EditData({ url: "product/update", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
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
            console.log(err);
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
      <form onSubmit={update}>
        {/* INPUT PRODUCT DETAILS */}
        <div className="container-fluid row">
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

          <div className="">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Basic information</h4>
                </div>
                <div className="row g-4 mb-4">
                  {/* <div className="mb-1 col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="image"
                      id="form-productImage/thumbnail"
                      onChange={fileUpload}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label htmlFor="form-product/name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-product/name"
                      value={details.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/mrp" className="form-label">
                      MRP
                    </label>
                    <input
                      type="number"
                      name="mrp"
                      className="form-control"
                      id="form-product/mrp"
                      value={details.mrp}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      id="form-product/price"
                      value={details.price}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/vendorprice" className="form-label">
                      Vendor Price
                    </label>
                    <input
                      type="number"
                      name="vendorPrice"
                      className="form-control"
                      id="form-product/vendorprice"
                      value={details.vendorPrice}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/stock" className="form-label">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      id="form-product/stock"
                      value={details.stock}
                      onChange={handleDetails}
                      readOnly
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor="form-product/segment" className="form-label">
                      Segment
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Segment"
                      onChange={handleSegment}
                      options={segmentsList}
                      className="p-0 mb-4"
                      value={details?.segment}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label htmlFor="form-product/price" className="form-label">
                      Category
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Categories"
                      onChange={handleCategories}
                      options={categoriesList}
                      className="p-0 mb-4"
                      value={details?.category}
                      readOnly
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor="form-product/price" className="form-label">
                      Sub Category
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Sub Categories"
                      onChange={handleSubCategories}
                      options={subCategoriesList}
                      className="p-0 mb-4"
                      value={details?.subCategory}
                    />
                  </div> */}
                </div>
                <div className="text-center mt-5">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Update Product"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditProduct;
