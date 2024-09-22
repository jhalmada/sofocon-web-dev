import { useCallback, useState } from "react";
import { RolesService } from "../../services/role/role.service";

const useAddroles = () => {
  const [loading, setLoading] = useState(false);
  const [idRol, setIdRol] = useState("");

  const postAddRoles = useCallback(async (rolesData) => {
    try {
      setLoading(true);
      const { data } = await RolesService.postAddRolesApi(rolesData).then(
        (response) => {
          setIdRol(response.data.id);
        },
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddRoles, loading, idRol };
};

export default useAddroles;
