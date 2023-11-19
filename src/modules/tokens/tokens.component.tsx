"use client";

import { IBalance, useBalance } from "@/hooks";
import React from "react";
import { useAccount } from "wagmi";

import styles from "./tokens.module.scss";

export const Tokens: React.FC = () => {
  const { address } = useAccount();
  const { fetchBalance, isLoading, reset, data, error } = useBalance(
    (state) => state
  );

  React.useEffect(() => {
    if (!address) return;

    fetchBalance({ address });
  }, [address, fetchBalance]);

  if (!address) return false;

  console.log(isLoading, data, error);

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>portfolio</h3>

      <div className={styles.tokens}>
        {data?.map((token, id) => {
          return <Token token={token} key={token.token_address + id} />;
        })}
      </div>
    </section>
  );
};

type Props = { token: IBalance[0] };

const Token: React.FC<Props> = ({
  token: {
    balance,
    decimals,
    logo,
    name,
    possible_spam,
    symbol,
    token_address,
  },
}) => {
  const hue = React.useMemo(() => {
    return Math.floor(Math.random() * 360);
  }, []);

  const value = (Number(balance) / 10 ** decimals).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <div
      style={{
        // @ts-ignore
        "--hue": hue,
      }}
      className={styles.token}
    >
      <div className={styles.icon}>
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className={styles.image} />
        ) : (
          <div className={styles.logo}>{name.at(0)}</div>
        )}
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>{`${value} ${symbol}`}</div>
    </div>
  );
};
