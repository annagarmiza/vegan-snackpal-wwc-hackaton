import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Router from "next/router";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import MatchProfileCard from "../components/MatchProfileCard";
import { Grid, Typography, Divider } from "@mui/material";
import Status from "../components/Status";
import { LinearProgress } from "@mui/material";
import {
  get_active_match,
  get_user_preferences,
  get_user_restrictions,
} from "../utils/api";

export default function Dashboard({ isAuthorized, userID, initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSender, setDataSender] = useState(null);
  const [dataRecipient, setDataRecipient] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const activeMatch = await get_active_match(userID);
        const matchSender =
          activeMatch.user_1.id === userID
            ? activeMatch.user_1
            : activeMatch.user_2;
        const matchRecipient =
          activeMatch.user_1.id === userID
            ? activeMatch.user_2
            : activeMatch.user_1;

        const senderPreferences = await get_user_preferences(matchSender.id);
        const recipientPreferences = await get_user_preferences(
          matchRecipient.id
        );

        const senderRestrictions = await get_user_restrictions(matchSender.id);
        const recipientRestrictions = await get_user_restrictions(
          matchRecipient.id
        );

        // Update dataSender and dataRecipient with the retrieved data
        setDataSender({
          ...matchSender,
          preferences: senderPreferences,
          restrictions: senderRestrictions,
        });

        setDataRecipient({
          ...matchRecipient,
          preferences: recipientPreferences,
          restrictions: recipientRestrictions,
        });

        setLoading(false); // Indicate that loading is complete
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const todo = data.get("todo");
    const res = await fetch("/api/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo, userID }),
    }).then((res) => res.json());
    setTodos([...todos, res]);
  };

  const signOut = async () => {
    new PassageUser().signOut();
    Router.push("/");
  };
  if (dataSender && dataRecipient) {
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={6} xl={6}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ marginX: 4, marginY: 4 }}>
                  This is your Pal! 🤩
                </Typography>
                <MatchProfileCard matchInfo={dataRecipient} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ marginX: 4, marginY: 4 }}>
                  Hey you!👋
                </Typography>

                <MatchProfileCard matchInfo={dataSender} />
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12} lg={6} xl={6} sx={{ marginY: 9 }}>
            <Status userID={userID} />
          </Grid>
        </Grid>
        {/* <div className={styles.main}>
          <Status userID={userID} />
          <br />
          <br />
          <div className={styles.container}>
            <div>
              <MatchProfileCard matchInfo={dataSender} />
              <MatchProfileCard matchInfo={dataRecipient} />
            </div>
          </div>
        </div> */}
      </>
    );
  } else {
    return (
      <div>
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />
      </div>
    );
  }
}

export const getServerSideProps = async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );

  return {
    props: {
      isAuthorized: loginProps.isAuthorized ?? false,
      userID: loginProps.userID ?? "",
    },
  };
};
