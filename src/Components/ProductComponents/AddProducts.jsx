import { Select } from "antd";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";

const AddProducts = () => {
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // RAW CATEGORY LIST DATA
  const [categoriesListData, setCategoriesListData] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  useEffect(() => {
    let token = getSession("authorization");

    AddData({ url: "category/list", token: token })
      .then((res) => {
        setCategoriesListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alert]);

  //MAPPING CATEGORIES OPTION FOR SELECT
  const categoriesList = categoriesListData
    .map((elem) => ({
      label: elem?.name,
      value: elem?._id,
    }));

  // VALUES STATE
  const [details, setDetails] = useState({
    name: "",
    file: "",
    price: "",
    category: ""
  });

  // function escapeRegExp(string) {
  //   return string.replaceAll(/[.*+?^$ {}&!`~@#%_+-=()|[\]\\]/g, "-").split("/").join("-").split("'").join("-");
  // }

  const handleNameDetails = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }

  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      setDetails({
        ...details,
        [name]: checked,
      });
    } else {
      const { name, value } = e.target;
      setDetails({
        ...details,
        [name]: value,
      });
    }
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
  const fileUpload = async (e) => {
    // Getting details field to set image id
    FileUpload({ image: e.target.files[0] })
      .then((res) => {
        if (res?.data?.status) {        
            setDetails({
              ...details,
              file: res?.data?.data,
            });
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
              errMessage: err?.message,
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

  // HANDLING API CALL METHOD
  const product = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    AddData({ url: "product/create", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          name: "",
          price: "",
        });
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
      <form onSubmit={product}>
        {/* INPUT PRODUCT DETAILS */}
        <div className="container-fluid row">
          {/* DISPLAY ERROR MESSAGE */}
          {alert?.errStatus && (
            <div
              className="alert alert-danger alert-dismissible fade show text-white"
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
              className="alert alert-success alert-dismissible fade show text-white"
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

          <div className="col-md-8">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Basic information</h4>
                </div>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="form-product/name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-product/name"
                      value={details.name}
                      onChange={handleNameDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/slug" className="form-label">
                      Price
                    </label>
                    <div className="input-group input-group--sa-slug">
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        id="form-product/price"
                        aria-describedby="form-product/price-addon form-product/price-help"
                        value={details.price}
                        onChange={handleDetails}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Card */}
            <div className="card mt-5 mb-5">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Images</h4>
                </div>
              </div>
              <div className="mt-n5 container-fluid">
                <div className="row">
                  <div className="mb-1 col-md-6">
                    {/* <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Thumbnail Image
                    </label> */}
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="thumbnail"
                      id="form-productImage/thumbnail"
                      onChange={fileUpload}
                      required
                    />
                  </div>
                  {/* <div className="mb-1 col-md-6">
                    <label
                      htmlFor="form-productImage/images"
                      className="form-label"
                    >
                      Multiple Product Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="images"
                      id="form-productImage/images"
                      onChange={multiFileUpload}
                      multiple
                      required
                    />
                  </div> */}
                  <div id="form-product/slug-help" className="mb-5 form-text">
                    Please Upload Images with extentions (jpg, jpeg, png, jfif, webp)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="col-md-4">
            {/* Categories Card */}
            <div className="card w-100">
              <div className="card-body p-md-5 mb-4">
                <div className="mb-5">
                  <h4 className="mb-1 fs-exact-18">Category</h4>
                </div>
                <div className="row">
                  <Select
                    // mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select Categories"
                    onChange={handleCategories}
                    options={categoriesList}
                    className="p-0 mb-4"
                    //value={details?.category}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT PRODUCT DETAILS */}
        <div className="container-fluid pb-5 row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-md-5">
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Add Product"
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

export default AddProducts;
