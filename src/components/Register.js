import React from "react";
import useRegister from "../hooks/useRegister";
import { FormattedMessage } from "react-intl";

export default function Register() {
  const {
    name,
    email,
    password,
    message,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  } = useRegister();

  return (
    <div
      className="container mt-5"
      style={{
        width: "70%",
      }}
    >
      <h2 className="text-left">
        <FormattedMessage id="message.title" defaultMessage="Sign up" />
      </h2>
      {message && message.text && (
        <div
          className={`alert ${
            message.isError ? "alert-danger" : "alert-success"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            <FormattedMessage id="message.label-name" defaultMessage="Name" />
          </label>

          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <FormattedMessage
              id="message.label-email"
              defaultMessage="Email address"
            />
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormattedMessage
            id="message.email-help"
            className="form-text"
            defaultMessage="We will never share your email with anyone else."
          ></FormattedMessage>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            <FormattedMessage
              id="message.label-password"
              defaultMessage="Password"
            />
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <FormattedMessage id="message.button-sign" defaultMessage="Sign up" />
        </button>
      </form>
    </div>
  );
}
