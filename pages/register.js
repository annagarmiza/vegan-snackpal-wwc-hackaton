import React, { useEffect } from "react";
import Registration from "../components/Registration";
import { Typography } from "@mui/material";
import { useState } from "react";
import { create_user } from "../utils/api";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import {
  get_user_passage_id,
  add_user_preference,
  add_user_restriction,
} from "../utils/api";
import Router from "next/router";

const Register = ({ isAuthorized, userID }) => {
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    get_user_passage_id(`${userID}`)
      .then((res) => {
        return res;
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formData]);
  console.log("formData", formData);
  const handleFormSubmit = (formData) => {
    setFormData(formData);
    create_user({
      address:
        formData.addressInfo.address +
        " " +
        formData.addressInfo.state +
        " " +
        formData.addressInfo.postcode,
      name: formData.personalInfo.name,
      email: formData.personalInfo.email,
      country: formData.addressInfo.country,
      user_id_passage: `${userID}`,
      id: `${userID}`,
      about_me: formData.preferencesInfo.about_me,
    }).then(() => {
      let preferences = formData.preferencesInfo.snack_preferences;
      let restricitons = formData.preferencesInfo.snack_restrictions;
      for (let i = 0; i < preferences.length; i++) {
        add_user_preference({ name: preferences[i], user_id: userID });
      }
      for (let i = 0; i < restricitons.length; i++) {
        add_user_restriction({ name: restricitons[i], user_id: userID });
      }
    });

    Router.push("/dashboard");
  };

  return (
    <div>
      <Registration onFormSubmit={handleFormSubmit} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  // let user_exist_in_supabase = get_user_passage_id(`${loginProps.userID}`).then(
  //   (res) => {
  //     return res;
  //   }
  // );
  return {
    props: {
      isAuthorized: loginProps.isAuthorized ?? false,
      userID: loginProps.userID ?? "",
      // exists_in_supabase: user_exist_in_supabase,
    },
  };
};
export default Register;
