import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import * as Actors from "./index.js";

const Input = ({ toPid }) => {
  return (
    <input
      onChange={e =>
        Actors.send(toPid, { type: "set-value", value: e.target.value })
      }
    />
  );
};

const Span = ({ pid }) => {
  const [state, setState] = useState({ text: "unset" });
  Actors.useMailbox(pid, message => {
    if (message.type === "set-value") {
      setState({ text: message.value });
    }
    if (message.type === "uppercase") {
      setState({ text: state.text.toUpperCase() });
    }
  });
  return <div>{state.text}</div>;
};

ReactDOM.render(
  <>
    <Span pid="my-span" />
    <button onClick={() => Actors.send("my-span", { type: "uppercase" })}>
      to uppercase
    </button>
    <Input toPid="my-span" />
  </>,
  document.getElementById("app")
);
