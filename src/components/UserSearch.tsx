"use client";
import useSWR from "swr";
import { FormEvent, useState } from "react";
import { SearchUser } from "@/model/user";
import { FadeLoader } from "react-spinners";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/debounce";

export default function UserSearch() {
  const [keyword, setKeyord] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="w-full flex flex-col my-4  items-center max-w-2xl">
      <form onSubmit={onSubmit} className="w-full mb-4">
        <input
          type="text"
          className="w-full text-xl p-3 outline-none border border-gray-400"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyord(e.target.value)}
        />
      </form>
      {error && <p>무언가가 잘못 되었음</p>}
      {isLoading && <FadeLoader />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
