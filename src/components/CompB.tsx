import React from "react";
import { useLocalStorage } from "src/hooks/useLocaStorage";

export function CompB() {
  const foo = useLocalStorage("foo");

  return (
    <div suppressHydrationWarning={true} style={{ color: "#ffffff" }}>
      {foo?.counter ? foo.counter : "No counter in local storage"}
    </div>
  );
}
