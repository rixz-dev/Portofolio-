import { useEffect } from "react";

export function useTabVisibility() {
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        document.body.classList.add("is-tab-hidden");
      } else {
        document.body.classList.remove("is-tab-hidden");
      }
    };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
}
