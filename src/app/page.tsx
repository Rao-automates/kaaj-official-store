import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Kaaj Official — Premium Pakistani Women's Fashion",
};

export default function HomePage() {
  return <HomeClient />;
}
