import { type Address } from "wagmi";

export type Balance = {
  token_address: Address;
  symbol: string;
  name: string;
  logo: string | null;
  thumbnail: string | null;
  decimals: number;
  balance: string;
  possible_spam: boolean;
}[];