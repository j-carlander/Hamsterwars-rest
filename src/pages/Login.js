import react from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={() => {
          navigate("/vote");
        }}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>

      <button
        onClick={() => {
          navigate("/register");
        }}>
        Register
      </button>
    </>
  );
}
