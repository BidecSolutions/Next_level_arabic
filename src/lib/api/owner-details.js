// src/pages/api/owner-details.js
import { fetchOwnerDetails } from "@/lib/api/agent.server";

export default async function handler(req, res) {
  const data = await fetchOwnerDetails();
  res.status(200).json({ data });
}
