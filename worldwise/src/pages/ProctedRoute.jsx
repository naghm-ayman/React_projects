import { useNavigate } from "react-router-dom";
import { useAuthen } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProctedRoute({ children }) {
  const { isAuthenticated } = useAuthen();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default ProctedRoute;
