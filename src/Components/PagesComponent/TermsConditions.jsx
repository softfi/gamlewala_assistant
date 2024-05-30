import React, { useEffect, useState } from "react";
import EditorComponent from "../EditorComponent";
import useSession from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";

const TermsConditions = () => {
  // ERROR MESSAGE STATE
  const [errMsg, setErrMsg] = useState({
    status: false,
    message: "",
  });
  // SUCCESS MESSAGE STATE
  const [successMsg, setSuccessMsg] = useState({
    status: false,
    message: "",
  });

  const [pageList, setPageList] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  const [id, setId] = useState();
  const [value, setValue] = useState();

  // FETCHING SETTINGS
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = getSession("authorization");

    // GetData({ url: "page", token: token })
    //   .then((res) => {
    //     setPageList(res.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  useEffect(() => {
    const termsConditionsData = pageList.find((elem) => elem.slug === "terms");

    if (termsConditionsData) {
      const termsConditions = termsConditionsData.content;
      const termsConditionsId = termsConditionsData._id;
      setValue(termsConditions);
      setId(termsConditionsId);
    }
  }, [pageList]);

  // FINAL SUBMIT
  const page = (e) => {
    // e.preventDefault();
    // let token = getSession("authorization");
    // const credentials = {
    //   pageId: id,
    //   name: "Terms of Service",
    //   content: value,
    //   slug: "terms",
    // };

    // EditData({ url: "page", cred: credentials, token: token })
    //   .then((res) => {
    //     window.scrollTo(0, 0);
    //     if (res.data.status) {
    //       setSuccessMsg({
    //         status: true,
    //         message: res.data.msg,
    //       });
    //       setErrMsg({
    //         status: false,
    //         message: "",
    //       });
    //     } else {
    //       setErrMsg({
    //         status: true,
    //         message: res.data.msg,
    //       });
    //       setSuccessMsg({
    //         status: false,
    //         message: "",
    //       });
    //     }
    //   })
    //   .catch((AxiosError) => {
    //     setErrMsg({
    //       status: true,
    //       message: AxiosError?.response?.data?.errors,
    //     });
    //     //console.log(AxiosError?.response?.data?.errors);
    //   });
  };

  return (
    <EditorComponent
      data={[value, setValue]}
      errors={[errMsg, setErrMsg]}
      success={[successMsg, setSuccessMsg]}
      submit={page}
    />
  );
};

export default TermsConditions;
