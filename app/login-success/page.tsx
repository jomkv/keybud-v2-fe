"use client";

import { useEffect, useState } from "react";

export default function LoginSuccess() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg mb-4">Closing in {countdown} seconds...</p>
        <p className="text-sm text-gray-500">Closing browser...</p>
      </div>
    </div>
  );
}
