import { redirect } from "next/navigation";

export default function AdminRedirectPage() {
  redirect(process.env.NEXT_PUBLIC_ADMIN_URL || "http://admin.localhost:3001");
}
