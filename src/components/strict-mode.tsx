import { useEffect, useState } from "react";

export const StrictModeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(animation);
  }, []);

  return enabled ? <>{children}</> : null;
};