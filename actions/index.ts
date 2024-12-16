"use server";
import { z } from "zod";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export async function sellYourItemAction(prevState: any, formData: FormData) {
  // Get cookie store at the beginning of the function
  const cookieStore = cookies();

  const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters."),
    contactEmail: z.string().email("This is not a valid email address."),
    price: z.string().min(1, "Price is required."),
    imageUrl: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  });

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    contactEmail: formData.get("contactEmail"),
    price: formData.get("price"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!validatedFields.success) {
    return {
      type: "error",
      message: validatedFields.error.issues[0].message,
    };
  }

  const { name, description, contactEmail, price, imageUrl } =
    validatedFields.data;

  try {
    // Pass the cookieStore directly
    const supabase = createServerActionClient({
      cookies: () => cookieStore,
    });

    const fileName = `product-${Date.now()}-${imageUrl.name}`;

    // Upload image to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Storage")
      .upload(fileName, imageUrl, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      return {
        type: "error",
        message: `Failed to upload image: ${uploadError.message}`,
      };
    }

    // Insert product details
    const { error: insertError } = await supabase
      .from("selling_product")
      .insert({
        name,
        imageUrl: uploadData?.path,
        contactEmail,
        description,
        price,
      });

    if (insertError) {
      console.error("Insert Error:", insertError);
      return {
        type: "error",
        message: `Failed to create product: ${insertError.message}`,
      };
    }

    return {
      type: "success",
      message: "Product uploaded successfully",
    };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      type: "error",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
