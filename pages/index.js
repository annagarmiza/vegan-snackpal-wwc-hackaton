// import styles from "@/styles/Home.module.css";
import PassageLogin from "@/components/login";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { useEffect } from "react";
import Router from "next/router";
import LoginScreen from "@/components/LoginScreen";
import { get_user_passage_id } from "../utils/api";

export default function Home({ isAuthorized, userID }) {
  useEffect(() => {
    get_user_passage_id(userID)
      .then((res) => {
        console.log(res, isAuthorized);
        if (res && isAuthorized) {
          // User is authorized and registered, so stay on the dashboard
          Router.push("/dashboard");
        } else if (isAuthorized) {
          // User is not registered, redirect to the registration page
          Router.push("/register");
        }
      })
      .catch((error) => {
        console.error("Error checking user registration:", error);
      });

    // if (isAuthorized) {
    //   Router.push("/dashboard");
    // } else {
    // }
  }, []);

  return (
    <>
      <LoginScreen />

      <div>{/* <PassageLogin /> */}</div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  console.log(loginProps);
  return {
    props: {
      isAuthorized: loginProps.isAuthorized ?? false,
      userID: loginProps.userID ?? "",
    },
  };
};
