import type { Metadata } from "next";

import { Styles } from "@/sass";
import { Wagmi } from "@/lib";

export const metadata: Metadata = {
  title: "Witchfolio",
  description: "Portfolio management backed by the power of the tarot.",
};

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wagmi>
      <html lang="en">
        <Styles />
        <body className={"dark"}>{children}</body>
      </html>
    </Wagmi>
  );
};

export default RootLayout;
