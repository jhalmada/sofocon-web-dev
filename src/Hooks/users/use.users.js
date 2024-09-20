import {useCallback, useEffect, useState} from "react";
import { UserService } from "../../services/user/user.service.js";

const useUsers = () => {
    const [usersResponse, setUsersResponse] = useState();
    const [loading, setLoading] = useState(false);

    const getAllUsers = useCallback(async () => {
        try {
            setLoading(true);
            const {data} = await UserService.getAllUsersApi();
            setUsersResponse(data)
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);
    return {usersResponse, loading};
};

export default useUsers;
