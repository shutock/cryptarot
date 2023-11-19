import { useConnect } from "wagmi";
import styles from "./connect.module.scss";
import classNames from "classnames";

export const Connect: React.FC = () => {
  const { connectAsync, connectors, isLoading, pendingConnector } =
    useConnect();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Connect your wallet to get an exclusive portfolio management advice
      </h2>

      <div className={styles.connectors}>
        {connectors.map((connector, id) => {
          const connect = async () => await connectAsync({ connector });

          const isPending = isLoading && pendingConnector?.id === connector.id;

          return (
            <div
              key={connector.id + id}
              onClick={connect}
              className={classNames(
                styles.connector,
                isPending && styles.pending
              )}
            >
              {connector.name}
            </div>
          );
        })}
      </div>
    </section>
  );
};
