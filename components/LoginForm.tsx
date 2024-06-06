import { FunctionComponent } from "preact";

export const LoginForm: FunctionComponent = () => {
  return (
    <div class="login-box">
      <h2>Login</h2>
      <form method="post" action="/login">
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
        <button type="submit" class="submit-button">Log In</button>
      </form>
      <a href="/register"> registrarse</a>
    </div>
  );
};
