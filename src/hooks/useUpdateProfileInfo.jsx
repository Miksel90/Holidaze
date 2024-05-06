import { useState } from "react";
import { updateProfileInfo } from "../utils/updateProfileInfo";

export function useUpdateProfileInfo() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateProfile = async (profileData) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await updateProfileInfo(profileData);

      setProfileInfo(response);
      setIsSuccess(true);
    } catch (e) {
      setError(e);
      console.error("Profile update error: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return { profileInfo, isLoading, error, updateProfile, isSuccess };
}
