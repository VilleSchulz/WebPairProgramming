import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import RouteGuard from "./components/RouteGuard";

// Pages & Components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs/:id" element={<JobPage />} />
                <Route
                  path="/jobs/add-job"
                  element={
                    <RouteGuard requireAuth={true}>
                      <AddJobPage />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/edit-job/:id"
                  element={
                    <RouteGuard requireAuth={true}>
                      <EditJobPage />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <RouteGuard requireAuth={false}>
                      <Signup />
                    </RouteGuard>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <RouteGuard requireAuth={false}>
                      <Login />
                    </RouteGuard>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;