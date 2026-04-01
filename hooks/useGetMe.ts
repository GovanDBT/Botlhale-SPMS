/**
 * @file hooks/useGetMe.ts
 * @description custom hook for managing fetched user profile
 */

import { Profile } from "@/generated/prisma/client";
import { CACHE_KEY_PROFILE } from "@/util/cache";
import { PROFILE_ENDPOINT } from "@/util/endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// retrieves the current users profile
export function useGetProfile() {
  const fetchProfile = async (): Promise<Profile> => {
    const response = await axios
      .get(PROFILE_ENDPOINT)
      .then((res) => res.data)
      .catch((err) => {
        const apiError =
          err.response?.data?.error || err.response?.data?.message;
        if (apiError) throw new Error(apiError);
        throw err;
      });
    return response.data;
  };
  return useQuery<Profile, Error>({
    queryKey: CACHE_KEY_PROFILE,
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
