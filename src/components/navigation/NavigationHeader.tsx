"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function NavigationHeader() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="absolute top-4 left-4 z-50">
      <Button variant="link" asChild>
        <a href="#" onClick={handleBack} className="cursor-pointer">
          ← Back
        </a>
      </Button>
    </div>
  );
}

export default NavigationHeader;
