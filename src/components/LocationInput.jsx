import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LocationInput({ label, value, onChange, placeholder, error }) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={`${label.toLowerCase()}-location`}
        className="flex items-center"
      >
        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
        {label}
      </Label>
      <Input
        id={`${label.toLowerCase()}-location`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(error && "border-destructive")} // to highlight error
      />
      {error && <p className="text-destructive text-sm mt-1">{error}</p>} // displaying error
    </div>
  );
}
