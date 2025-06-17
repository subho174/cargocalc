export default function calculateShippingCost(distanceKm, weightKg, type) {
  const base = type === 'express' ? 10 : 5;
  const perKm = type === 'express' ? 0.2 : 0.1;
  const perKg = type === 'express' ? 1.5 : 1.0;

  return base + distanceKm * perKm + weightKg * perKg;
}
