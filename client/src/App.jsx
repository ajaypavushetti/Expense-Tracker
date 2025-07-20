import { useState, lazy, Suspense } from "react"; // Import lazy and Suspense
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home.jsx"; // Remove direct imports
// import Test from "./pages/Test.jsx"; // Remove direct imports
// import Login from "./pages/Login.jsx"; // Remove direct imports
// import Register from "./pages/Register.jsx"; // Remove direct imports
import Spinner from "./components/Spinner"; // Import your Spinner component for fallback

// Lazily load your page components
const Home = lazy(() => import("./pages/Home.jsx"));
const Test = lazy(() => import("./pages/Test.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Spinner />}> {/* Wrap your Routes with Suspense and provide a fallback */}
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("TrackMint-user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;