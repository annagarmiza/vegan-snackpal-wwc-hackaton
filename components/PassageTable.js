import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Wrap your custom element with a React component
const PassagePasskeyTable = dynamic(
  () =>
    import("@passageidentity/passage-elements/passage-passkey-table").catch(
      (error) => {
        console.error("Error importing PassagePasskeyTable:", error);
        // Return a placeholder or handle the error as needed.
        return () => <div>Error loading component</div>;
      }
    ),
  { ssr: false }
);

function PasskeyTable() {
  useEffect(() => {
    // Load and initialize the custom element on the client side
    const passagePasskeyTable = document.createElement("passage-passkey-table");
    passagePasskeyTable.setAttribute("app-id", "8EdPjfRSgxaxQZ1FahYrmj0a");

    // Append it to the DOM where you want to use it
    const container = document.getElementById("passkey-table-container");
    container.appendChild(passagePasskeyTable);
  }, []);

  return (
    <div>
      <div id="passkey-table-container">
        {/* <PassagePasskeyTable app-id="8EdPjfRSgxaxQZ1FahYrmj0a" /> */}
      </div>
    </div>
  );
}

export default PasskeyTable;
