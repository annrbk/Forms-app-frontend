import React from "react";
import useLogin from "../hooks/useLogin";
import { FormattedMessage } from "react-intl";

export default function Login() {
  const { email, password, message, setEmail, setPassword, handleSubmit } =
    useLogin();

  return (
    <div className="container mt-5">
      <h2 className="text-left">
        <FormattedMessage id="message.title" defaultMessage="Login" />
      </h2>
      {message && <div className="alert alert-danger"> {message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <FormattedMessage
              id="message.label-email"
              defaultMessage="Email address"
            />
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            <FormattedMessage
              id="message.email-help"
              defaultMessage="We will never share your email with anyone else."
            />
          </div>
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
          <FormattedMessage id="message.button-login" defaultMessage="Login" />
        </button>
      </form>
    </div>
  );
}
