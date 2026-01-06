import Link from "@lib/shared/components/links";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

interface ToNewButtonProps {
  href: string;
}

export function ToNewButton(props: ToNewButtonProps) {
  return (
    <Link href={props.href}>
      <Button variant="contained" startIcon={<Add />}>
        New
      </Button>
    </Link>
  );
}
