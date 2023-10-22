import { useEffect } from "react";
import Card from "@mui/material/Card";

const PassageLogin = () => {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return (
    <Card elevation={15} sx={{ width: 320, height: 420 }}>
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-auth>
    </Card>
  );
};

export default PassageLogin;
