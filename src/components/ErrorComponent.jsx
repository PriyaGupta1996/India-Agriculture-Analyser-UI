import React from "react";
import Alert from "@mui/material/Alert";

export const ErrorComponent = ({ type, message }) => {
  return <Alert severity={type}>{message}</Alert>;
};
