"use client";

import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/utils/supabase";

export default function Static() {
  const [posts, setPosts] = useState<
    { id: string; title: string; content: string }[]
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabaseClient.from("posts").select("*");

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* Display post content here */}
            {post.title} - {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
