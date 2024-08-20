import { uploadFile } from "@/data/file";

export default function FileUpload() {
  const userFileUpload = async (formData: FormData) => {
    "use server";

    const file = formData.get("uploadFile") as File;

    const data = await uploadFile(file);

    if (!data) {
      console.log(data);
      //   return redirect("/signup?message=Could not register user");
    }

    console.log(data);

    // return redirect("/login");
  };

  return (
    <form>
      <input type="file" name="uploadFile" />

      <button formAction={userFileUpload}>Upload</button>
    </form>
  );
}
