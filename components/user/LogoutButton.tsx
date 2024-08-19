import { logoutUser } from "@/data/auth/authentication";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const logoutButtonClick = async () => {
    "use server";

    logoutUser();

    redirect("/login");
  };

  return (
    <form>
      <button
        formAction={logoutButtonClick}
        className="flex items-center gap-2 ml-4 mt-auto h-12 pb-6 w-52 hover:text-blue-600 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Log out</span>
      </button>
    </form>
  );
}
