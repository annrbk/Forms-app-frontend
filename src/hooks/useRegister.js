import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/registerService";
import { useState } from "react";

const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    try {
      await registerUser(userData);

      setMessage({ text: "Registration successful!", isError: false });
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      setMessage({ text: "Registration failed!", isError: true });
      console.error(error);
    }
  };

  return {
    name,
    email,
    password,
    message,
    handleSubmit,
    setName,
    setEmail,
    setPassword,
  };
};

export default useRegister;
