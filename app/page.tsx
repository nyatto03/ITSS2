import type { Metadata } from "next"
import HomePage from "@/components/home-page"

export const metadata: Metadata = {
  title: "EatSmart - Find food that fits your schedule",
  description: "Find restaurants and meals that fit your schedule",
}

export default function Home() {
  return <HomePage />
}
