import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import { Select } from "antd";

const EditCategory = () => {
  const params = useParams();
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // DETAILS STATE
  const [details, setDetails] = useState({
    id: params.id,
    name: "",
    isActive: "true"
  });

  // HANDLING SEGMENT
  // const handleSegment = (value) => {
  //   setDetails((prev) => {
  //     return {
  //       ...prev,
  //       segment: value,
  //     };
  //   });
  // };

  // const [segment, setSegment] = useState([])

  // useEffect(() => {
  //   let token = getSession("authorization");
  //   GetData({ url: "segment", token: token })
  //     .then((res) => {
  //       setSegment(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [alert]);

  // const segmentList = segment
  //   .map((elem) => ({
  //     label: elem?.name,
  //     value: elem?._id,
  //   }));

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: `category/${params.id}`, token: token })
      .then((res) => {
        if (res?.data?.status) {
          setDetails({
            id: params?.id,
            name: res?.data?.data?.name,
            // segment: res?.data?.data?.segment?._id,
            isActive: "true"
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // SETTING DETAILS TO STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  // ADD API CALL
  const edit = (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    EditData({ url: "category/update", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          name: ""
        })
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

  return (
    <React.Fragment>
      <form onSubmit={edit}>
        <div className="container-fluid py-5 row">
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
          <div className="mb-5">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h5 className="mb-0 fs-exact-18">Update Category Details</h5>
                </div>
                {/* <form> */}
                <div className="row">
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-category/name" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-category/name"
                      value={details.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  {/* <div className="mb-4 col-md-4">
                                            <label className="form-check">
                                                <input type="checkbox" className="form-check-input" name="status" onClick={() => setSubCategory(!subCategory)} />
                                                <span className="form-check-label">Has Child</span>
                                            </label>
                                        </div>

                                        {subCategory && <div className="mb-4">
                                            <label htmlFor="form-product/name" className="form-label">
                                                Sub Category Name
                                            </label>
                                            <input type="text" name='subCategory' className="form-control" id="form-product/name" value={details.subCategory} onChange={handleDetails} />
                                        </div>} */}

                  <div className="mb-4">
                    <input
                      type="submit"
                      className="btn btn-outline-primary btn-sm mb-0"
                      value="Save"
                    />
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditCategory;
