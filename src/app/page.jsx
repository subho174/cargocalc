import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const cardContents = [
    {
      title: "Real-Time Estimates",
      description: "Get instant cost breakdowns based on distance and weight.",
    },
    {
      title: "Simple Interface",
      description:
        "Clean and intuitive design makes shipping calculations easy.",
    },
    {
      title: "Transparent Pricing",
      description: "No hidden charges. See exactly what you’ll pay.",
    },
  ];

  return (
    <main className="min-h-screen mt-20 md:mt-0 flex flex-col items-center justify-center px-4 py-12 md:px-8">
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 leading-13">
          Estimate Your Shipping Costs Instantly
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Enter distance and weight to get accurate shipping rates. No
          guesswork, just clear pricing.
        </p>
        <Button size="lg" asChild>
          <Link href="/estimate">
            Start Estimating <ArrowRight />{" "}
          </Link>
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-7xl">
        {cardContents.map((card) => (
          <Card
            key={card.title}
            className="transition-all shadow-lg hover:shadow-xl hover:-translate-y-3 duration-500 ease-in-out"
          >
            <CardContent className="p-6 text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={32} />
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
