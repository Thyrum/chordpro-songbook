import { Typography } from "@mui/material";
import React from "react";

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return <Typography color="primary">{children}</Typography>;
}
