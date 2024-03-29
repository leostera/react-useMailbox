# useMailbox 📬
> A small React hook to turn your components into "Actors".

Status: _experimental_.

This is really just a proof of concept that late-binding and asynchronouse
message-passing on top of React Hooks is possible, albeit a clunky.

Here's 3 components, communicating via message passing where a Span has a
mailbox and processes messages to display text, and to uppercase text.

<img src="https://media.giphy.com/media/lqkMptDWhT2UV0SrUg/giphy.gif" />

#### Why is this useful?
Well, for starters it lets you structure your
applications without being tied to your component hierarchy. That is, you can
sort of organize your components in whatever way makes most sense, and if you
want to you can have all of your application as a bunch of sibling components.

## Sample Usage

```js
import * as Actors from 'react-useMailbox';

const Label = ({ pid }) => {
  const [state, setState] = useState({ text: "unset" });
  Actors.useMailbox(pid, message => {
    if (message.type === "set-value") {
      setState({ text: message.value });
    }
    if (message.type === "uppercase") {
      setState({ text: state.text.toUpperCase() });
    }
  });
  return <span>{state.text}</span>;
};

// render it first...

Actors.send("some-identifier", {type: "set-value", value: "hello!" });
```
