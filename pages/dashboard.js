import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Router from "next/router";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { PassageUser } from "@passageidentity/passage-elements/passage-user";
import MatchProfileCard from "../components/MatchProfileCard";
import MatchStarter from "@/components/MatchStarter";
import Status from "../components/Status";
import {
  get_user_passage_id,
  generateMatch,
  get_active_match,
  get_user_preferences,
  get_user_restrictions,
  get_user,
} from "../utils/api";

export default function Dashboard({ isAuthorized, userID, initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [data, setData] = useState("");
  // const [matchData, setMatchData] = useState("");

  useEffect(() => {
    // get_user_passage_id(`${userID}`)
    //   .then((res) => {
    //     return res;
    //   })
    //   .then((data) => {
    //     setData(data);
    //     console.log("DATA", data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // get_user_preferences(`${userID}`)
    //   .then((res) => {
    //     return res;
    //   })
    //   .then((data) => {
    //     setData({ ...data, preferences: res });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // get_user_restrictions(`${userID}`)
    //   .then((res) => {
    //     return res;
    //   })
    //   .then((data) => {
    //     setData({ ...data, restrictions: res });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const fetchData = async () => {
      try {
        // Fetch user passage ID
        const userPassageIdData = await get_user_passage_id(userID);
        // setData(userPassageIdData);

        // Fetch user preferences
        const userPreferencesData = await get_user_preferences(userID);
        // setData((prevData) => ({
        //   ...prevData,
        //   preferences: userPreferencesData,
        // }));

        // Fetch user restrictions
        const userRestrictionsData = await get_user_restrictions(userID);
        setData((prevData) => ({
          ...prevData,
          userPassageIdData,
          userPreferencesData,
          userRestrictionsData,
        }));
        // setData((prevData) => ({
        //   ...prevData,
        //   restrictions: userRestrictionsData,
        // }));
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }

    console.log("userId", userID);
  }, []);

  useEffect(() => {
    if (data === null) {
      Router.push("/register");
    }
  }, [data]);

  // useEffect(() => {
  //   get_user("a472d9e9-dcd2-4349-9805-18ecd577e44c")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
  // examples
  // useEffect(() => {
  //   get_user(userID).then((res) => {
  //     console.log(res);
  //   });
  //   generateMatch(userID).then((res) => {
  //     console.log(res);
  //   });
  // }, []);

  const signOut = async () => {
    new PassageUser().signOut();
    Router.push("/");
  };

  return (
    <>
      {/* <MatchStarter /> */}
      {/* <Status /> */}

      <div className={styles.main}>
        <div className={styles.container}>
          {data ? ( // Conditionally render MatchProfileCard if data is available
            <MatchProfileCard matchInfo={data} />
          ) : (
            <p>Loading data...</p> // You can replace this with a loading indicator
          )}

          <h1>Welcome {userID}! </h1>
          <br></br>
          <button onClick={signOut}>Sign Out</button>
          <br></br>
          <div className={styles.list}>
            {todos?.length > 0 ? (
              todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
            ) : (
              <p>You have completed all todos!</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Todo: <input type="text" name="todo" />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );

  // let matchData = {
  //   name: "Summy Sunshine",
  //   address: "Stonehedge Level 34, Ontario",
  //   user_country: "Canada",
  //   recieved_packages: "2",
  //   sent_packages: "2",
  //   aboutMe: "I love boozing it up and I can't stop",
  //   preferences: ["Chocoholic", "Mint Enthusiast"],
  //   restrictions: ["Kosher", "Gluten Free"],
  //   userImage:
  //     "https://www.adobe.com/express/create/media_1bb16e7672a85e70733846fe9d8fb1b412da97be9.jpeg?width=400&format=jpeg&optimize=medium",
  // };

  // let user = get_user("565a41a9-4ede-4bac-b491-b39619bf9a61")
  //   .then((res) => {
  //     console.log(res.json());
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // let preference = get_user_preferences("565a41a9-4ede-4bac-b491-b39619bf9a61")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // console.log("THIS IS USER", user);
  // console.log("THIS IS PREFERENCE", preference);

  // if (loginProps.isAuthorized) {
  //   const supabase = getSupabase(loginProps.userID);
  //   const { data } = await supabase
  //     .from("todo")
  //     .select()
  //     .is("is_complete", false);
  //   console.log("");
  //   return {
  //     props: {
  //       isAuthorized: loginProps.isAuthorized ?? false,
  //       userID: loginProps.userID ?? "",
  //       initialTodos: data ?? [],
  //     },
  //   };
  // } else {
  return {
    props: {
      isAuthorized: loginProps.isAuthorized ?? false,
      userID: loginProps.userID ?? "",
    },
  };
};
