import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import PageLayout from "../components/PageLayout";

const LoginPage = () => {

  const navigate = useNavigate()
  return (
    <PageLayout>
      <Login />
      <div className="hover:text-sky-300 ease-in-out duration-200">
        <button onClick={() => navigate("/register")}>I haven't an account</button>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
