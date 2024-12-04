import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = (e) => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
  };
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/add-job">Add job</Link>
            <span>{JSON.parse(sessionStorage.getItem("user")).email}</span>
            <button onClick={handleClick}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
