"use client";
import { FadeLoader } from "react-spinners";
import PostListCard from "./PostListCard";
import usePosts from "@/hooks/posts";

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {loading && (
        <div className="w-full flex justify-center my-32">
          <FadeLoader color="red" />
        </div>
      )}
      {posts && (
        <ul className="space-y-8">
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
