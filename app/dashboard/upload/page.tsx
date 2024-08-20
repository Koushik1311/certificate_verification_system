import AllFiles from "@/components/dashboard/upload/AllFiles";
import FileUpload from "@/components/dashboard/upload/FileUpload";
import InteractiveSection from "@/components/global/InteractiveSection";

export default function Upload() {
  return (
    <div className="mt-8 mx-8">
      <h1>Upload</h1>
      <InteractiveSection sectionHeading="All files">
        <AllFiles />
      </InteractiveSection>
      <FileUpload />
    </div>
  );
}
