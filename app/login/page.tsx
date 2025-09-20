import { LoginForm } from "@/app/login/components/forms/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-evenly bg-muted p-6 md:p-10">
      <Link href="/">
        <img src="/assets/Logo_With_Phrase.svg" />
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
