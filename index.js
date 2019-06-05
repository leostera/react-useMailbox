import React, { useState, useEffect } from "react";

const mailboxes = {};

export const send = (pid, message) => {
  const entry = mailboxes[pid]
  if (entry) {
    const { mailbox, setMailbox } = entry;
    setTimeout(() => {
      console.log(pid, "<-", message);
      setMailbox([...mailbox, message])
    }, 0);
  }
};

export const useMailbox = (pid, handler) => {
  const [mailbox, setMailbox] = useState([]);
  useEffect(() => {
    mailboxes[pid] = { mailbox, setMailbox };
  }, []);
  const message = mailbox.pop();
  if (message) handler(message);
};
