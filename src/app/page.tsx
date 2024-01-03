import { supabaseClient } from "@/utils/supabase";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
};

export default async function Home() {
  const { data: posts } = await supabaseClient
    .from("posts")
    .select("id, title");

  return (
    <main className="flex flex-col h-screen justify-normal p-6">
      {posts?.map((post: Post) => (
        <div key={post.id}>
          <Link href={`/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </main>
  );
}
