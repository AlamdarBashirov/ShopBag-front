import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountThunk, fetchUserProfile, logOutThunk } from "../../redux/reducers/profileSlice";
import ProfileInfoCard from "./profileInfoCard/ProfileInfoCard";

const ProfilePage = () => {
  const dispatch = useDispatch();
  // const { user, loading, error } = useSelector((state) => state.profile);
  const infos = useSelector((state) => state.profile.profile )
  const loading = useSelector((state) => state.profile.loading )
  const error = useSelector((state) => state.profile.error )

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const logOut = () => {
    dispatch(logOutThunk())
  }

  const deleteAccount = (id) => {
    dispatch(deleteAccountThunk(id)) 
  }

  if (loading) return <h1>Yüklenir...</h1>;
  if (error) return <h1>Hata: {error}</h1>;
  if (!infos) return <h1>Kullanıcı bilgisi bulunamadı.</h1>;

  console.log(infos);
  
  return (
    <div>
      <div>
        {infos && infos.map(item => <ProfileInfoCard item={item} logOut={() => logOut()} deleteAccount={() => deleteAccount(item._id)}  />)}
      </div>
    </div>
  );
};

export default ProfilePage;
