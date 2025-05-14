"use client";

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#20232d",
        py: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="white">
        © 2025 nstech • Todos os direitos reservados
      </Typography>
    </Box>
  );
}
