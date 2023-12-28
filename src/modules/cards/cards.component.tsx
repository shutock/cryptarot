"use client";

import React from "react";
import { useAccount } from "wagmi";

import { useCards } from "@/hooks";

import styles from "./cards.module.scss";

export const Cards: React.FC = () => {
  const { address } = useAccount();

  const { getCards, reset, cards } = useCards((state) => state);

  const list = "crypto";

  const handler = () => {
    getCards({ list });
  };

  if (!address) return false;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>cards spread</h3>

      <div className={styles.cards}>
        {cards?.map((card, id) => {
          return (
            <div className={styles.card} key={card + id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.image}
                src={`/assets/cards/${list}/${card}.${
                  list === "crypto" ? "png" : "jpg"
                }`}
                alt={card}
              />
              <span className={styles.title}>{card.replaceAll("-", " ")}</span>
            </div>
          );
        })}
      </div>

      <button onClick={handler} className={styles.button}>
        {cards ? "reroll" : "get spread"}
      </button>
    </section>
  );
};
