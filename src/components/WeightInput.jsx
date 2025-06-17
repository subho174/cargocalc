import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WeightInput({ weight, onChange, error }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="weight" className="flex items-center">
        <Package className="mr-2 h-4 w-4 text-muted-foreground" />
        Weight (kg)
      </Label>
      <Input
        id="weight"
        type="number"
        placeholder="e.g., 5.5"
        step="0.1"
        min="0.1"
        value={weight}
        onChange={(e) => onChange(e.target.value)}
        className={cn(error && "border-destructive")}
      />
      <p className="text-sm text-muted-foreground">
        Enter the total weight of your package in kilograms.
      </p>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
}
