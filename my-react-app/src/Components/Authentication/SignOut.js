import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from "../SessionContext";

const SignOut = () => {
    const navigate = useNavigate();
    const { setUserRoleType, setUser, setId } = useSession();

    useEffect(() => {
        const handleSignOut = async () => {
            setUserRoleType('guest');
            setUser('');
            setId('');
            navigate('/');
        };

        handleSignOut();
    }, [navigate, setUserRoleType]);

    return null;
};

export default SignOut;
