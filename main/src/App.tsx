import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Protected from "./components/Protected";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const App = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
