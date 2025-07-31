import AuthLeftPanel from "@/components/AuthLeftPanel";
import LoginForm from "@/components/auth/LoginForm";
import TextH2 from "@/components/typography/TextH2";
import TextP from "@/components/typography/TextP";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <AuthLeftPanel />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl space-y-6 px-4 sm:px-6 md:px-8">
          <TextH2 className="font-bold text-left">Welcome Back</TextH2>
          <TextP className="text-left">
            Please enter your credentials to continue.
          </TextP>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
