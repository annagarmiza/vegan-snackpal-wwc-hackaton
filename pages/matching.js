import MatchStarter from "@/components/MatchStarter";
import React, { useEffect } from "react";
import { useState } from "react";
import { generateMatch } from "../utils/api";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import Router from "next/router";
const Match = ({ isAuthorized, userID }) => {
  return (
    <div>
      <MatchStarter userID={userID} />
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
export default Match;
