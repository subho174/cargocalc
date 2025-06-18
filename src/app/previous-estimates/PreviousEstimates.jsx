"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PackageX, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { toast } from "sonner";

const PreviousEstimates = () => {
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    // getting previous estimates stored in sessionStorage
    const storedEstimates = sessionStorage.getItem("shipping_estimates");
    if (storedEstimates) {
      try {
        const parsedEstimates = JSON.parse(storedEstimates);
        // Sorting estimates so that newer comes first
        setEstimates(parsedEstimates.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error("Error parsing estimates from session storage:", error);
        toast.error("Failed to load previous estimates");
      }
    }
  }, []);

  // function to clear stored estimates
  const handleClearEstimates = () => {
    sessionStorage.removeItem("shipping_estimates");
    setEstimates([]);
    toast.success("All estimates cleared successfully!", {
      description: "You can start fresh with new estimates.",
    });
  };

  if (estimates.length === 0) {
    return (
      <Card
        className="w-full max-w-md mx-auto mt-60 md:mt-40 p-8 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-3" // Subtle lift on hover
      >
        <CardHeader className="flex flex-col items-center justify-center pt-4 pb-4">
          <PackageX className="h-16 w-16 text-muted-foreground mb-4" />{" "}
          <CardTitle className="text-2xl font-bold text-center">
            No Estimates Yet!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground pb-4">
          <p className="text-base mb-2">
            It looks like you haven't calculated any shipping estimates before.
          </p>
          <p className="text-sm">
            Use the estimation tool to get started and see your history here!
          </p>
        </CardContent>
        <Button asChild className="w-6/10 mx-auto">
          <Link href="/estimate">Get your first estimate</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="w-full mx-auto mt-20 p-4 md:px-8 2xl:px-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Previous Estimates</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearEstimates}
          className="flex items-center gap-2"
        >
          <XCircle className="h-4 w-4" /> Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estimates.map((estimate, index) => (
          <Card
            key={index}
            className="transition-all hover:-translate-y-2 duration-500 shadow-lg hover:shadow-xl ease-in-out"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {estimate.origin} <ArrowRight className="h-5 w-5" />
                {estimate.destination}
              </CardTitle>
              <CardDescription>
                Estimated on:{" "}
                {new Date(estimate.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" at "}
                {new Date(estimate.timestamp).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Distance:
                </span>
                <Badge variant="outline">
                  {estimate.distance.toFixed(2)} km
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Weight:
                </span>
                <Badge variant="outline">{estimate.weight} kg</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Service Type:
                </span>
                <Badge>{estimate.type}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Cost:</span>
                <span className="text-primary">₹ {estimate.cost}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center my-8">
        <Button asChild variant="custom">
          <Link href="/estimate">
            <ArrowLeft /> Back to Estimator
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PreviousEstimates;
