"use client";

import {
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Paper sx={{ width: 300, mt: 7, mr: 4, p: 2, borderRadius: 6 }}>
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/"
            selected={pathname === "/"}
            sx={{
              bgcolor: pathname === "/" ? "action.hover" : "transparent",
              borderRadius: 2,
            }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Agendamentos" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/novo-agendamento"
            selected={pathname === "/novo-agendamento"}
            sx={{
              bgcolor:
                pathname === "/novo-agendamento"
                  ? "action.hover"
                  : "transparent",
              borderRadius: 2,
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Novo Agendamento" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}
