import React from "react";
import Registration from "../components/Registration";
import { Typography } from "@mui/material";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (formData) => {
    setFormData(formData);
    console.log(formData);
  };

  return (
    <div>
      <Registration onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default Register;
