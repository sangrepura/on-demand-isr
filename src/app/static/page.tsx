import { supabaseClient } from "@/utils/supabase";

export const revalidate = 40;

export default async function Static() {
  //revalidateTag("posts");
  const { data } = await supabaseClient.from("posts").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
