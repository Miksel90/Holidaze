import { useState } from "react";
import { updateProfileInfo } from "../utils/updateProfileInfo";

/**
 * Custom hook to handle updating profile information.
 *
 * @returns {Object} The state and functions related to updating profile information.
 * @returns {Object} profileInfo - The updated profile information.
 * @returns {boolean} isLoading - Loading state of the update process.
 * @returns {Object} error - Error object if the update fails.
 * @returns {boolean} isSuccess - Indicates if the profile update was successful.
 * @returns {function} updateProfile - Function to initiate the profile update process.
 * @example
 * const { profileInfo, isLoading, error, updateProfile, isSuccess } = useUpdateProfileInfo();
 */
export function useUpdateProfileInfo() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Initiates the profile update process.
   *
   * @param {Object} profileData - The data to update the profile with.
   * @returns {Promise<void>}
   */
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
