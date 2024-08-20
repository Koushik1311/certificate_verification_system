import CertificateSearch from "@/components/global/CertificateSearch";
import Image from "next/image";

export default function VerifyPage() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <Image
          src="/certificate_icon.png"
          alt="certificate icon"
          width={200}
          height={200}
          quality={100}
          priority={true}
          className="w-32 h-auto"
        />

        <h2 className="mt-8 mb-6 text-slate-600 text-2xl font-medium">
          Search for certificate using certificate id
        </h2>

        <CertificateSearch />
      </div>
    </div>
  );
}
