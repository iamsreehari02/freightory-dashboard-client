import AuthLeftPanel from "@/components/AuthLeftPanel";
import TextH2 from "@/components/typography/TextH2";
import TextP from "@/components/typography/TextP";
import ContactUsForm from "@/components/auth/ContactUsForm";

export default function ContactUsPage() {
  return (
    <div className="flex h-screen">
      <AuthLeftPanel />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-4 sm:px-6 md:px-8">
          <TextH2 className="font-bold text-left">Contact Us</TextH2>
          <TextP className="text-left mb-9">
            Join the INDLOG Network and connect with agents worldwide
          </TextP>
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}
