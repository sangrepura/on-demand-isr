import { supabaseSSR } from "@/utils/supabase";
import { cookies } from "next/headers";

export default async function Page() {
  const { error, data } = await supabaseSSR(cookies).from("posts").select();
  error && console.error(error);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
