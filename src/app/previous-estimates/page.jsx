import PreviousEstimates from "./PreviousEstimates";

export const metadata = {
  title: "Previous Estimates - CargoCalc",
  description:
    "Review your recent shipping cost estimates from this session. Great for comparing multiple quotes.",
  keywords: ["past estimates", "cargo history", "session shipping estimates"],
  openGraph: {
    title: "Your Shipping History - CargoCalc",
    description:
      "See all your recent shipping estimates and compare them side by side.",
    url: "https://cargocalc.vercel.app/previous-estimates",
    siteName: "CargoCalc",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const page = () => {
  return <PreviousEstimates />;
};

export default page;
