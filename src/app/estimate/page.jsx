import ExpenseFormulaCard from "../../components/ExpenseFormulaCard";
import ShippingEstimator from "../../components/ShippingEstimator";

export const metadata = {
  title: "Estimate Shipping - CargoCalc",
  description:
    "Calculate your shipping cost instantly. Select origin, destination, weight, and delivery type to get an accurate quote.",
  keywords: [
    "shipping estimator",
    "calculate freight",
    "logistics pricing",
    "cargo cost",
  ],
  openGraph: {
    title: "Shipping Estimate Tool - CargoCalc",
    description:
      "Get a fast and accurate estimate for your shipment. Supports regular and express delivery.",
    url: "https://cargocalc.vercel.app/estimate",
    siteName: "CargoCalc",
    images: [
      {
        url: "https://cargocalc.vercel.app/favicon.ico",
        width: 400,
        height: 400,
        alt: "CargoCalc - Smart Shipping Cost Estimator",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Estimate() {
  return (
    <div className="min-h-screen mt-16 lg:mt-0 flex justify-center lg:items-center ">
      <div className="flex flex-col lg:mt-16 xl:flex-row xl:items-start items-center px-4 py-8 md:px-8 gap-8">
        <ShippingEstimator />
        <ExpenseFormulaCard />
      </div>
    </div>
  );
}
