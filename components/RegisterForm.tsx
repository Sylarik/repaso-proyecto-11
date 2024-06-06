import { FunctionComponent } from "preact";

export const RegisterForm: FunctionComponent = () => {
  return (
    <div class="login-box">
      <h2>Register</h2>
      <form method="post" action="/register">
        <div class="form-field">
          <input type="text" name="name" placeholder="Name" required />
        </div>
        <div class="form-field">
          <input type="text" name="email" placeholder="Email" required />
        </div>
        <div class="form-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="submit-button">Register</button>
      </form>
      <a href="/login"> loguearse </a>
    </div>
  );
};
