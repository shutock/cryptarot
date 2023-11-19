"use client";

import {
  type Address,
  useAccount,
  useEnsName,
  useDisconnect,
  useEnsAvatar,
} from "wagmi";

import styles from "./profile.module.scss";

export const Profile: React.FC = () => {
  const { address } = useAccount();
  const { data: name } = useEnsName({ address });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Avatar name={name} />
        <Name address={address} name={name} />
      </div>
      <Disconnect />
    </section>
  );
};

const Name: React.FC<{ name?: string | null; address?: Address }> = ({
  name,
  address,
}) => {
  const shortAddress = `0x${address?.slice(2, 6)}...${address?.slice(-4)}`;

  return (
    <div className={styles.userInfo}>
      <div className={styles.primary}>{name ?? shortAddress}</div>
      {name && <div className={styles.secondary}>{shortAddress}</div>}
    </div>
  );
};

const Disconnect: React.FC = () => {
  const { disconnectAsync } = useDisconnect();
  const disconnect = async () => await disconnectAsync();

  return (
    <button className={styles.disconnect} onClick={disconnect}>
      Disconnect
    </button>
  );
};

const Avatar: React.FC<{ name?: string | null }> = ({ name }) => {
  const { data: avatar } = useEnsAvatar({ name });

  const emoji = "🧙‍♀️";

  return (
    <div className={styles.avatar}>
      {avatar ? (
        //eslint-disable-next-line @next/next/no-img-element
        <img className={styles.image} src={avatar} alt="avatar" />
      ) : (
        <span className={styles.emoji}>{emoji}</span>
      )}
    </div>
  );
};
