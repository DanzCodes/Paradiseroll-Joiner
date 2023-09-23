import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import Register from "../components/Register";

const RegisterPage = () => {

  const navigate = useNavigate();
  return (
    <PageLayout>
      <Register />
      <div className="hover:text-sky-300 ease-in-out duration-200">
        <button onClick={() => navigate("/login")}>I already have an account</button>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
