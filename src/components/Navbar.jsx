import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex w-full fixed top-0 justify-between items-center px-4 border-1 backdrop-blur-md md:px-8 2xl:px-16">
      <Link href="/" className="text-3xl text-center my-4 font-bold">
        CargoCalc
      </Link>
      <Button asChild size="sm">
        <Link href="/previous-estimates">View Previous estimates</Link>
      </Button>
    </header>
  );
};

export default Navbar;
