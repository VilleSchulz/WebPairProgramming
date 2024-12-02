import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-job">Add job</Link>
        <Link to ="/login">Login</Link>
        <Link to = "/signup">Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
