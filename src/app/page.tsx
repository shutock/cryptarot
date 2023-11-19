"use client";

import { Cards, Reading, Tokens, Wallet } from "@/modules";

const HomePage: React.FC = () => {
  return (
    <div>
      <Wallet />
      <Tokens />
      <Cards />
      <Reading />
    </div>
  );
};

export default HomePage;
