import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration</h1>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              Retour au site
            </Link>
            <SignOutButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
