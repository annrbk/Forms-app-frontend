import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginUser } from "../services/loginService";
import { useState, useContext } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData);

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          role: data.role,
          name: data.name,
          _id: data.userId,
        })
      );
      setUser({ email, role: data.role, name: data.name, _id: data.userId });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMessage("Invalid login or password");
      console.error("Login error", error);
    }
  };

  return { email, password, message, setEmail, setPassword, handleSubmit };
};

export default useLogin;
