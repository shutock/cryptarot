import { Wagmi } from "@/lib";

import type { Metadata } from "next";

import "@/sass/global.scss";

export const metadata: Metadata = {
  title: "Cryptarot",
  description: "Portfolio management backed by the power of the tarot.",
};

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wagmi>
      <html lang="en">
        <body className={"dark"}>{children}</body>
      </html>
    </Wagmi>
  );
};

export default RootLayout;
