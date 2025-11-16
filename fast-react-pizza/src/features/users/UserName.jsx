import { useSelector } from "react-redux";

function UserName() {
    const username = useSelector((state)=> state.user.username)
    return <p className="text-sm font-semibold hidden md:block">{username}</p>;
}

export default UserName;
