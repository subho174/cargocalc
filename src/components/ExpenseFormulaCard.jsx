"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Truck, GaugeCircle, Weight, Banknote } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";

export default function ExpenseFormulaCard() {
  const [type, setType] = useState("standard");

  const formulas = {
    standard: {
      base: 5,
      perKm: 0.1,
      perKg: 1.0,
      description: "Economical choice for regular shipments.",
    },
    express: {
      base: 10,
      perKm: 0.2,
      perKg: 1.5,
      description: "Fastest delivery option for urgent packages.",
    },
  };

  const { base, perKm, perKg, description } = formulas[type];

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <Card className="w-full max-w-lg gap-2 mt-10 xl:mt-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center text-primary">
          <Truck className="mr-3 h-6 w-6" /> Shipping Cost Formula
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div className="flex items-center gap-4">
          <Label htmlFor="shipping-type-formula">Formula Type:</Label>
          <Select onValueChange={setType} value={type}>
            <SelectTrigger id="shipping-type-formula" className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Shipping</SelectItem>
              <SelectItem value="express">Express Shipping</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence mode="wait">
          {/* AnimatePresence for exit animations */}
          <motion.div
            key={type}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 shrink-0 text-muted-foreground" />
              <span className="text-base font-semibold">
                Cost = Base Fee + (Distance × Rate) + (Weight × Rate)
              </span>
            </div>

            <ul className="space-y-2 pl-2 text-muted-foreground text-base">
              <li className="flex items-center">
                <Banknote className="inline-block h-4 w-4 mr-2 shrink-0 text-primary" />
                <strong>Base Fee :</strong>₹ {base}
              </li>
              <li className="flex items-center">
                <GaugeCircle className="inline-block h-4 w-4 mr-2 shrink-0 text-green-600" />
                <strong>Distance Rate :</strong>₹ {perKm} / km
              </li>
              <li className="flex items-center">
                <Weight className="inline-block h-4 w-4 mr-2 shrink-0 text-amber-600" />
                <strong>Weight Rate :</strong>₹ {perKg} / kg
              </li>
            </ul>

            <div className="mt-4 p-3 bg-secondary/30 rounded-md border text-xs text-foreground">
              <strong className="text-primary-foreground">
                Example Calculation:
              </strong>
              <p className="mt-1">
                For 25 km & 4 kg (using{" "}
                {type.charAt(0).toUpperCase() + type.slice(1)}):
              </p>
              <p className="font-mono text-sm mt-1">
                ₹{base} + ₹(25 × {perKm}) + ₹(4 × {perKg}) ={" "}
                <span className="font-bold text-lg text-green-700">
                  ₹ {(base + 25 * perKm + 4 * perKg).toFixed(2)}
                </span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
