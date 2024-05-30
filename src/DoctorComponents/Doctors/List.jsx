import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import Datatable from "../../Components/DataTableComponent/Datatable";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { Tag } from "antd";

const List = () => {
  // SESSION CUSTOM SESSION HOOK
  const [setSession, getSession] = useSession();

  //ORDER LIST STATE
  const [doctorListData, setDoctorListData] = useState([]);
  // DOCTOR'S DELETION STATUS STATE
  const [deleteDoctorData, setDeleteDoctorData] = useState(false);

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // GETTING AUTH TOKEN FROM SESSION
  const token = getSession("authorization");

  useEffect(() => {
    GetData({ url: "doctors", token })
      .then((res) => {
        setDoctorListData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteDoctorData]);

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...doctorListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "IMAGE",
      key: "image",
      dataIndex: "image",
      render: (_, elem) => (
        <Link href="app-product.html" className="me-4">
          <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
            <img src={elem?.image} width="40" height="40" alt="" />
          </div>
        </Link>
      ),
    },
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "DESIGNATION",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "SPECIALISATION",
      key: "specialisation",
      dataIndex: "specialisation",
    },
    {
      title: "REGISTRATION NO.",
      key: "medicalCouncilRegNumber",
      dataIndex: "medicalCouncilRegNumber",
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
                to={"/doctors-panel/update-doctor/" + elem._id}
              >
                Update
              </Link>
            </li>
            <li
              onClick={() => {
                deleteItem(elem._id);
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Delete
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {
    DeleteData({ url: `doctors/${id}`, token })
      .then((res) => {
        if(res.data.status){
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)   
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
          setAlert({
            errStatus: false,
            successStatus: false,
            errMessage: "",
            successMessage: "",
          })
        }, 3000);
        }
        setDeleteDoctorData((prev) => !prev);
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
      <div className="container-fluid py-4">
        <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
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
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Doctors Panel List</h6>
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
    </React.Fragment>
  );
};

export default List;
