import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  // Check if environment variables are available
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("Supabase URL or API key is missing!");
    console.error(
      "SUPABASE_URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"
    );
    console.error(
      "SUPABASE_KEY:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "Not set"
    );
    throw new Error(
      "Supabase environment variables are not properly configured."
    );
  }

  // Return the client if the variables are correct
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
