"use client";

import { Token, useBalance, useCards, useReading } from "@/hooks";
import styles from "./reading.module.scss";
import React from "react";
import { useAccount } from "wagmi";
import { Message, useChat } from "ai/react";

export const Reading: React.FC = () => {
  const { data: tokens } = useBalance((state) => state);
  const { cards } = useCards((state) => state);
  // const { isLoading, read, reset, data, error } = useReading((state) => state);

  const { messages, isLoading, error, append } = useChat();

  React.useEffect(() => {}, []);

  const { address } = useAccount();

  const messageToSend = React.useMemo(() => {
    if (!tokens) return null;

    const formattedTokens = Object.keys(tokens)
      .map((chain) => tokens[chain])
      .flat();

    const tokenStrings = formattedTokens?.map(
      ({ balance, name, symbol, decimals }) => {
        const value = (Number(balance) / 10 ** decimals).toLocaleString(
          undefined,
          {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }
        );
        return `- Token: ${name} (${symbol}), Balance: ${value} ${symbol}`;
      }
    );

    const cardsStrings = cards?.map((card) => `- ${card}`);

    const content = `
  Can you provide me with a relevant advice (what should i sell and buy) for my imaginary token portfolio based on the following tarot spread:

  My crypto portfolio structure:
  ${tokenStrings?.join("\n")}

  My tarot spread:
  ${cardsStrings?.join("\n")}

  BE SPECIFIC!, specify which particular token buy and sell and how much for each (from my portfolio).
  `;

    return content;
  }, [cards, tokens]);

  React.useEffect(() => {
    if (!messageToSend) return;
    if (!cards) return;

    const message: Message = { content: messageToSend, role: "user", id: "0" };

    append(message);
  }, [append, cards, messageToSend]);

  if (!address) return false;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>reading the spread</h3>
      {error && <div>{error.message}</div>}
      {messages.length > 1 && (
        <div className={styles.message}>{messages[1].content}</div>
      )}
    </section>
  );
};
