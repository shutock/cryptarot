"use client";

import "@/sass/globals.scss";

export const Styles: React.FC = () => {
  return (
    <style jsx global>
      {`
        html {
          --font-text: "Geist",
            sans-serif ";
          --font-icon: " Material Symbols Rounded
              ", sans-serif";
        }
      `}
    </style>
  );
};
