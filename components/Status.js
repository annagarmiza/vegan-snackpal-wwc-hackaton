import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import InteractiveStepper from "./steps/InteractiveStepepr";
import ReadOnlyStepper from "./steps/ReadOnlyStepper";
import api, { get_active_match } from "../utils/api";
import { LinearProgress } from "@mui/material";

const Status = ({ userID }) => {
  console.log("userid in track status", userID);
  let [loading, setLoading] = useState(true);
  let [orderStatus, setorderStatus] = useState(null);
  let [recieving_most_recent_status, setrecieving_most_recent_status] =
    useState(null);
  let [active_match, setActive_match] = useState(null);
  let loggedinUser = userID;

  useEffect(() => {
    get_active_match(userID, {
      statuses: {
        where: {
          sender_id: loggedinUser,
        },
      },
    })
      .then((res) => {
        setActive_match(res);
        console.log(res);
        console.log(res.statuses);
        const most_recent_status = res.statuses.sort((a, b) => {
          return b.status - a.status;
        })[0];
        if (most_recent_status) {
          api("orderStatus", "create", {
            data: {
              match_id: res.id,
              status: 1,
              sender_id: loggedinUser,
              recipient_id: most_recent_status.recipient_id,
            },
          });
          setorderStatus(most_recent_status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    get_active_match(userID, {
      statuses: {
        where: {
          NOT: {
            sender_id: loggedinUser,
          },
        },
      },
    }).then((res) => {
      const most_recent_status = res.statuses.sort((a, b) => {
        return b.status - a.status;
      })[0];

      setrecieving_most_recent_status(most_recent_status);
    });
  }, []);

  const order_status_step = orderStatus ? orderStatus.status : 0;

  function onPressNext() {
    const next_status_value = order_status_step + 1;
    if (next_status_value > 4) {
      return;
    }
    api("orderStatus", "create", {
      data: {
        match_id: active_match.id,
        status: next_status_value,
        sender_id: loggedinUser,
        recipient_id: orderStatus
          ? orderStatus.recipient_id
          : (() => {
              if (active_match.user_id_1 === loggedinUser) {
                return active_match.user_id_2;
              } else {
                return active_match.user_id_1;
              }
            })(),
      },
    }).then((order_status) => {
      setorderStatus(order_status);
    });
  }

  if (loading) {
    return (
      <div>
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />
        <LinearProgress color="secondary" />
      </div>
    );
  }
  return (
    <Grid container>
      <Grid item xs={12} xl={6}>
        <InteractiveStepper
          activeStep={order_status_step}
          onPressNext={onPressNext}
        />
      </Grid>
      <Grid item xs={12} xl={6}>
        <ReadOnlyStepper activeStep={recieving_most_recent_status} />
      </Grid>
    </Grid>
  );
};

export default Status;
