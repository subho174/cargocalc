"use client";

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Calculator, Loader2, Package } from "lucide-react";
import LocationInput from "../components/LocationInput";
import WeightInput from "../components/WeightInput";
import ShippingOptions from "../components/ShippingOptions";
import axios from "axios";
import calculateShippingCost from "../utils/calculateCost";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ShippingEstimator = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("standard");

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState(null);

  // function to vailidate form inputs
  // returns true or false
  const validateForm = () => {
    const newErrors = {};

    if (!origin || origin.length < 3) {
      newErrors.origin = "Origin must be at least 3 characters.";
    }
    if (!destination || destination.length < 3) {
      newErrors.destination = "Destination must be at least 3 characters.";
    }
    if (origin === destination) {
      newErrors.destination = "Origin and destination cannot be the same";
    }

    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight) || parsedWeight <= 0.1) {
      newErrors.weight = "Weight must be at least 0.1 kg.";
    } else if (parsedWeight > 1000) {
      newErrors.weight = "Weight cannot exceed 1000 kg.";
    }

    if (!type) newErrors.type = "Please select a shipping type.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setEstimateResult(null);
      return;
    }

    setLoading(true);
    setEstimateResult(null);

    try {
      // fetching distance using the API
      const res = await axios.post("/api/calcDistance", {
        origin,
        destination,
      });

      const distance = res.data.data;

      if(!distance || distance <= 0) 
        toast.error(res.data.message || "Invalid distance received, Check your inputs");

      // calculating shipping cost based on distance, weight, and type
      const cost = Number(
        calculateShippingCost(distance, Number(weight), type).toFixed(2)
      );

      // Saving estimate to sessionStorage
      const estimate = {
        origin,
        destination,
        distance,
        weight,
        type,
        cost,
        timestamp: Date.now(),
      };

      const previous = JSON.parse(
        sessionStorage.getItem("shipping_estimates") || "[]"
      );
      previous.push(estimate);
      sessionStorage.setItem("shipping_estimates", JSON.stringify(previous));

      let estimatedDelivery;

      switch (type) {
        case "express":
          estimatedDelivery = "1-3 days";
          break;
        case "standard":
        default:
          estimatedDelivery = "3-7 days";
          break;
      }

      //saving current estimate
      setEstimateResult({
        cost,
        delivery: estimatedDelivery,
        currency: "INR",
      });

      toast.success("Estimate calculated successfully!");
    } catch (error) {
      console.error("Error fetching distance:", error);
      toast.error(error.response?.data?.message || "Failed to calculate estimate, Please try again");
      setEstimateResult({ error: "Failed to get estimate, Please try again" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
          <Package className="mr-3 h-8 w-8" />
          Shipping Estimator
        </CardTitle>
        <CardDescription className="mt-2 text-md text-muted-foreground">
          Get an instant estimate for your package shipment.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <LocationInput
            label="Origin"
            value={origin}
            onChange={setOrigin}
            placeholder="e.g., Mumbai"
            error={errors.origin}
          />
          <LocationInput
            label="Destination"
            value={destination}
            onChange={setDestination}
            placeholder="e.g., Kolkata"
            error={errors.destination}
          />
          <WeightInput
            weight={weight}
            onChange={setWeight}
            error={errors.weight}
          />
          <ShippingOptions type={type} onChange={setType} error={errors.type} />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Estimating...
              </>
            ) : (
              "Get Shipping Estimate"
            )}
          </Button>
        </form>
        {estimateResult ? (
          <div className="mt-8 p-6 md:mt-0 bg-secondary/20 content-center border border-secondary rounded-lg text-center shadow-inner">
            {estimateResult.error ? (
              <p className="text-destructive text-lg font-semibold">
                {estimateResult.error}
              </p>
            ) : (
              <>
                <h3 className="text-xl font-bold text-primary">
                  Estimated Cost:
                </h3>
                <p className="text-4xl font-extrabold text-green-600 mt-2">
                  {estimateResult.cost} {estimateResult.currency}
                </p>
                <h3 className="text-xl font-bold text-primary mt-4">
                  Estimated Delivery:
                </h3>
                <p className="text-2xl font-semibold text-foreground mt-2">
                  {estimateResult.delivery}
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Note: This is an estimate and may vary based on final package
                  dimensions and additional services.
                </p>
              </>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 p-6 md:mt-0 md:py-0 bg-muted/30 border border-border rounded-lg text-center text-muted-foreground shadow-inner min-h-[200px] flex flex-col items-center justify-center"
          >
            <Calculator className="h-10 w-10 mb-3 text-muted-foreground" />
            <p className="text-lg font-semibold">
              Enter details and click "Get Shipping Estimate"
            </p>
            <p className="text-sm mt-1">
              Your estimated cost and delivery time will appear here.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingEstimator;
