import axios from "axios";

type Inputs = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: FileList;
};

export const registerUser = async (data: Inputs) => {
  try {
    const userFormData = new FormData();

    if (data.avatar && data.avatar.length > 0) {
      userFormData.append("avatar", data.avatar[0]);
    } else {
      alert("Please submit a file for avatar");
      throw new Error("Please submit a file for avatar");
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
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("Status:", error.response.status); // ✅ works
        console.error("Message:", error.response.data.message); // ✅ should work
        console.error("Errors:", error.response.data.errors);
      });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.status);
    } else {
      console.log(error);
    }
  }
};
