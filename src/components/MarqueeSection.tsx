import { Marquee } from "./Marquee";

export function MarqueeSection() {
  return (
    <>
      <Marquee
        items={[
          "REIZ / ARCHIVE",
          "EST. 2009",
          "SOFTWARE / AI / CRYPTO",
          "INDONESIA",
          "LEARNING, ALWAYS",
        ]}
        speed="normal"
      />
      <Marquee
        items={[
          "PYTHON",
          "JAVASCRIPT",
          "NODE",
          "CSS",
          "SQLITE",
          "GITHUB",
          "CRYPTOGRAPHY",
        ]}
        speed="slow"
        separator="—"
      />
    </>
  );
}
