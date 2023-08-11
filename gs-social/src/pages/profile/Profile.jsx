import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import  axios from "axios"
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setuser] = useState({});
  const params = useParams();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  // console.log(params)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?username=${params.username}`);
      setuser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <> 
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF+"ad.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.coverPicture || PF+"userprofile.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
