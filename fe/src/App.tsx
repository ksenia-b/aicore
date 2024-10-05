import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import Threads from "./components/Threads.jsx";
import Thread from "./components/Thread.jsx";
import AuthRoute from './components/AuthRoute'; // To protect routes that require authentication
import { useAuth } from './context/AuthContext';
import Navbar from './components/NavBar';

function App() {
  const { isAuthenticated } = useAuth();

  return <>
    {isAuthenticated && <Navbar />}

    <Routes>
      {/* <Route path="/" element={<Navigate to="/threads" />}></Route> */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route
        path="/threads"
        element={
          <AuthRoute>
            <Threads />
          </AuthRoute>
        }
      ></Route>
      <Route
        path="/threads/:threadId"
        element={
          <AuthRoute>
            <Thread />
          </AuthRoute>
        }
      ></Route>
      <Route path="*" element={<Navigate to="/login" />}></Route>
    </Routes>

  </>;
}

export default App;
