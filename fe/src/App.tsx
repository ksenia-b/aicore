import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import Threads from "./components/Threads.jsx";
import Thread from "./components/Thread.jsx";

function App() {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/threads" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/threads" element={<Threads />}></Route>
        <Route path="/threads/:threadId" element={<Thread />}></Route>
      </Routes>
    </Router>
  </>;
}

export default App;
