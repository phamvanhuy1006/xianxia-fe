import "./styles.scss";

const NeonSnippetLoginScreen = () => {
  return (
      <div className="body">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" name="" required />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="text" name="" required />
              <label>Password</label>
            </div>
            <button type="submit" className="button-submit">
              Submit
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </form>
        </div>
      </div>
  );
};

export default NeonSnippetLoginScreen;
