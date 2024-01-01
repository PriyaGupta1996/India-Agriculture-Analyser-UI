import React, { useEffect, useState } from "react";
import { DashboardsContainer } from "../containers/DashboardsContainer";
import { generateToken } from "../services/generateToken";
import { ErrorComponent } from "../components/ErrorComponent";

export const Dashboard = () => {
  const [error, setError] = useState("");
  useEffect(() => {
    const executeGenerateToken = async () => {
      try {
        const token = await generateToken();
        if (token && token.length > 0) {
          const bearerToken = `bearer ${token}`;
          localStorage.setItem("bearerToken", bearerToken);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    executeGenerateToken();
  }, []);
  return error.length > 0 ? (
    <ErrorComponent type="error" message={error} />
  ) : (
    <>
      {localStorage.getItem("bearerToken") &&
        localStorage.getItem("bearerToken").length > 0 && (
          <DashboardsContainer />
        )}
    </>
  );
};
