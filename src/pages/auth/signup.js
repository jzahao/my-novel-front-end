import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div className="text-center m-5-auto">
        <h2>Sign Up</h2>
        <form action="/home">
            <p>
                <label>Username or email address</label><br/>
                <input type="text" name="first_name" required />
            </p>
            <p>
                <label>Password</label>
                <br/>
                <input type="password" name="password" required />
            </p>
            <p>
                <label>Confirm password</label>
                <br/>
                <input type="password" name="password" required />
            </p>
            <p>
                <button id="signup" type="submit">Sign Un</button>
            </p>
        </form>
        <footer>
            <p>Have a account ?  <Link to="/signin">Sign In</Link>.</p>
            <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
        </div>
    );
  }
  
  export default SignUp;
  