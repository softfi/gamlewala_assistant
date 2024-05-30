import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { AddData } from "../../Apis/Setters/AddData";

const AddDoctor = () => {
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // VALUES STATE
  const [details, setDetails] = useState({
    name: "",
    patientHandled: "",
    experties: "",
    shortDescription: "",
    description: "",
  });

  // EDITABLE IMAGE STATE
  const [editableImg, setEditableImg] = useState("");

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

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // Getting details field to set image id
    var fieldName = e.target.name;
    FileUpload({ file: e.target.files[0], path: "products", type: "Product" })
      .then((res) => {
        if (res.data.status) {
          if (fieldName === "image") {
            setEditableImg(URL.createObjectURL(e.target.files[0]));
            setDetails({
              ...details,
              image: res?.data?.data?.uploadImage?._id,
            });
          }
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
  const doctor = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    AddData({ url: "web/doctor", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          name: "",
          image: "",
          patientHandled: "",
          experties: "",
          shortDescription: "",
          description: "",
        });
        setEditableImg("");
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
      <form onSubmit={doctor}>
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

          <div className="col-md-8 card-body ">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Doctor Information</h4>
                </div>
                <div className="row g-4 mb-4">
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctorImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <div className="row">
                      <div className="col-1 p-0">
                        <span className="ms-4">
                          <img
                            src={editableImg}
                            width="40"
                            height="40"
                            alt=""
                          />
                        </span>
                      </div>
                      <div className="col-10 ps-5">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          id="form-doctorImage/thumbnail"
                          onChange={fileUpload}
                          required
                        />
                      </div>
                    </div>
                  </div>
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
                      onChange={handleDetails}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="form-doctor/patient" className="form-label">
                    Patient Handled
                  </label>
                  <input
                    type="number"
                    name="patientHandled"
                    className="form-control"
                    id="form-doctor/patient"
                    value={details.patientHandled}
                    onChange={handleDetails}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="form-doctor/experties" className="form-label">
                    Experties
                  </label>
                  <div className="input-group input-group--sa-title">
                    <textarea
                      type="text"
                      name="experties"
                      className="form-control"
                      id="form-doctor/experties"
                      aria-describedby="form-doctor/experties-addon form-doctor/experties-help"
                      value={details.title}
                      onChange={handleDetails}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-doctor/shortDescription"
                    className="form-label"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="form-doctor/shortDescription"
                    name="shortDescription"
                    className="sa-quill-control form-control sa-quill-control--ready"
                    rows="4"
                    value={details.shortDescription}
                    onChange={handleDetails}
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-product/description"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    id="form-product/description"
                    name="description"
                    className="sa-quill-control form-control sa-quill-control--ready"
                    rows="4"
                    value={details.description}
                    onChange={handleDetails}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="text-center m-5">
                <input
                  type="submit"
                  className="btn btn-outline-primary btn-sm mb-0 px-5"
                  value="Save"
                />
              </div>
            </div>
          </div>
        </div>
        {/* SUBMIT DOCTOR DETAILS */}
        {/* <div className="container-fluid pb-5 row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="text-center">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0 px-5" value="Save" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </form>
    </React.Fragment>
  );
};

export default AddDoctor;
