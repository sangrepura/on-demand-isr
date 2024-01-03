import { supabaseClient } from "@/utils/supabase";

export default async function Static({ params }: { params: { id: string } }) {
  //revalidateTag("posts");
  const { data } = await supabaseClient
    .from("posts")
    .select()
    .match({ id: params.id }) // Use the id passed to the page
    .single();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

const getStaticPaths = async () => {
  const { data, error } = await supabaseClient.from("posts").select("id");

  if (error) {
    console.error("Error fetching posts:", error);
    return { paths: [], fallback: false };
  }

  const paths = data.map((post) => ({ params: { id: post.id } }));

  return { paths, fallback: true };
};

//export default function Page({ params }: { params: { id: string } }) {
//  const [post, setPost] = useState(null);
//
//  useEffect(() => {
//    const fetchData = async () => {
//      const { data: postData, error } = await supabaseClient
//        .from("posts")
//        .select()
//        .match({ id: params.id }) // Use the id passed to the page
//        .single();
//
//      if (!error) {
//        setPost(postData);
//      } else {
//        console.error("Error fetching post:", error);
//      }
//    };
//
//    fetchData();
//  }, [params.id]);
//
//  // Render the post data or a loading message
//  if (!post) {
//    return <div>Loading...</div>;
//  }
//
//  return <pre>{JSON.stringify(post, null, 2)}</pre>;
//}
