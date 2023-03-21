import react from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={() => {
          navigate("/login");
        }}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="password2">Retype Password</label>
          <input type="password" name="password" id="password2" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
