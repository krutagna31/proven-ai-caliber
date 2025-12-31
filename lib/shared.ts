import { Client } from "@/types";

export function getDomain(client: Client): string {
  const DOMAIN_MAP: Record<Client, string> = {
    "sunpharma": process.env.NEXT_PUBLIC_SUNPHARMA_DOMAIN!,
  };
  return DOMAIN_MAP[client];
}
