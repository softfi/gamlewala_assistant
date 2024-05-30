import axios from "axios";

const FileUpload = async (props) => {
  try {
    function getSession(cname) {
      return window.sessionStorage.getItem(cname);
    }

    let file = {
      image: props.image,
      // type: props.type,
      // module_path: props.path,
      // module_id: 1,
    };

    let token = getSession("authorization");

    const response = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}image-upload`,
      file,
      {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default FileUpload;   
