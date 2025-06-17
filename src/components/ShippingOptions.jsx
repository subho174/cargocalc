import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ShippingOptions({ type, onChange, error }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="shipping-type-select">Shipping Type</Label>
      <Select onValueChange={onChange} value={type}>
        <SelectTrigger
          id="shipping-type-select"
          className={cn(error && "border-destructive")}
        >
          <SelectValue placeholder="Select a shipping type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">
            Standard (Economical, Slower)
          </SelectItem>
          <SelectItem value="express">Express (Faster, Higher Cost)</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
}
