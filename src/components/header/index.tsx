"use client";

import { AppBar, Toolbar, Box } from "@mui/material";
import Image from "next/image";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#20232d", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/logo-nstech.png"
            alt="Logo NSTech"
            width={160}
            height={40}
            priority
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
