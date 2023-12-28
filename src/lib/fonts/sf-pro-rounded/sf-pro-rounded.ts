import localFont from "next/font/local";

export const sfProRounded = localFont({
  src: [
    {
      path: "./SF-Pro-Rounded-Light.otf",
      weight: "300",
    },
    {
      path: "./SF-Pro-Rounded-Regular.otf",
      weight: "400",
    },
    {
      path: "./SF-Pro-Rounded-Medium.otf",
      weight: "500",
    },
    {
      path: "./SF-Pro-Rounded-Semibold.otf",
      weight: "600",
    },
    {
      path: "./SF-Pro-Rounded-Bold.otf",
      weight: "700",
    },
  ],
  display: "swap",
  style: "normal",
  preload: true,
});
