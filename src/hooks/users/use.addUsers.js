import { useCallback, useState } from "react";
import { UserService } from "../../services/user/user.service.js";

const AddUsers = () => {
  const [loading, setLoading] = useState(false);

  const postAddUsers = useCallback(async (userData) => {
    try {
      setLoading(true);
      const { data } = await UserService.postAddUsersApi(userData);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddUsers, loading };
};

export default AddUsers;
