"use client";

import { useBalance, useCards, useReading } from "@/hooks";
import styles from "./reading.module.scss";
import React from "react";
import { useAccount } from "wagmi";

export const Reading: React.FC = () => {
  const { data: tokens } = useBalance((state) => state);
  const { cards } = useCards((state) => state);
  const { isLoading, read, reset, data, error } = useReading((state) => state);

  const { address } = useAccount();

  React.useEffect(() => {
    if (!tokens || !cards) return;

    read({ tokens, cards });
  }, [tokens, cards, read]);

  if (!address) return false;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>reading the spread</h3>
      {isLoading && <div>loading...</div>}
      {data}
    </section>
  );
};
