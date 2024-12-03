import { useCallback, useEffect, useState } from "react";
import { RolesService } from "../../services/role/role.service.js";

const useRoles = () => {
  const [RolesResponse, setRolesResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [Rolmodified, setRolModified] = useState(false);

  const getAllRoles = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await RolesService.getAllRolesApi();

      setRolesResponse(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllRoles();
  }, [getAllRoles, Rolmodified]);
  return { RolesResponse, loading, setRolModified };
};

export default useRoles;
