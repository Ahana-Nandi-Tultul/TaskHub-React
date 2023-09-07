import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { getProfile } from "../../../utilities/manageUsers";

const Profile = () => {
    const {user} = useContext(AuthContext);
    const [profile, setProfile] = useState({})
    useEffect(() => {
        setProfile(getProfile(user?.email))
    }, [user?.email])
    console.log(profile)
     return (
        <div className="p-4">
            <div className="card lg:card-side bg-base-100 shadow-xl h-full md:h-96 p-4 w-full">
                <figure><img src={user?.photoURL} alt="Album" className="h-full w-full"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p>{profile?.bio}</p>
                </div>
            </div>
        </div>
       
    );
};

export default Profile;