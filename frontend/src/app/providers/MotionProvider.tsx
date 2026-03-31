"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeOut" }}>
      {children}
    </MotionConfig>
  );
}