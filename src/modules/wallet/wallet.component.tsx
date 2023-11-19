"use client";

import { useAccount } from "wagmi";

import { Connect } from "./connect";
import { Profile } from "./profile";

import styles from "./wallet.module.scss";

export const Wallet: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.wrapper}>
      {isConnected ? <Profile /> : <Connect />}
    </div>
  );
};
