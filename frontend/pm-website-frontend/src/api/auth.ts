import axios from "axios";

type Inputs = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: FileList;
};

export const registerUser = async (data: Inputs) => {
  const userFormData = new FormData();

  if (data.avatar && data.avatar.length > 0) {
    userFormData.append("avatar", data.avatar[0]);
  } else {
    return;
  }
  userFormData.append("username", data.username);
  userFormData.append("fullname", data.fullname);
  userFormData.append("email", data.email);
  userFormData.append("password", data.password);

  await axios
    .post("http://localhost:8000/api/v1/users/register", userFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((error) => {
      console.error("Errors:", error.response.data.errors);
      alert(error.response.data.message);
      return;
    });
};

export const loginUser = async ({
  username_email,
  password,
}: {
  username_email: string;
  password: string;
}) => {
  if (!username_email || !password) {
    console.log("Email or username along with password are required");
    return;
  }

  await axios
    .post(
      "http://localhost:8000/api/v1/users/login",
      { username: username_email, email: username_email, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => console.log(error.response.data));
};

export const getUserDetails = async () => {};
