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

const IMAGE_URL =
  "https://xdwutqmwwlojomwfesjf.supabase.co/storage/v1/object/public/snackPalStorage/";

const Register = ({ isAuthorized, userID }) => {
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState(null);
  // const [userID, setUserID] = useState(userID)

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
  const handleFormSubmit = async (formData) => {
    const imageFile = formData.preferencesInfo.image_url;
    let imageUrl = IMAGE_URL;
    const formDataImg = new FormData();
    formDataImg.append("data", userID);
    formDataImg.append("image_url", imageFile);

    try {
      const response = await fetch("api/addImage", {
        method: "POST",
        body: formDataImg,
      });

      if (response.ok) {
        const data = await response.json();
        let { path } = data; // Log the data if the request was successful
        imageUrl += path;
      }
    } catch (error) {
      console.error("Error:", error);
    }

    create_user({
      address:
        formData.addressInfo.address +
        " " +
        formData.addressInfo.state +
        " " +
        formData.addressInfo.postcode,
      name: formData.personalInfo.name + " " + formData.personalInfo.lastName,
      email: formData.personalInfo.email,
      country: formData.addressInfo.country,
      user_id_passage: `${userID}`,
      id: `${userID}`,
      about_me: formData.preferencesInfo.about_me,
      image_url: imageUrl,
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

    Router.push("/matching");
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
