import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setuser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentuser } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  useEffect(() => {
    setIsLiked(post.likes.includes(currentuser._id)); 
  }, [currentuser._id,post.likes]);  
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setuser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    console.log(currentuser._id)
    try { 
        axios.put("/posts/" + post._id + "/like", { userId: currentuser._id });
        console.log("successfull")

    } catch (err) {console.log(err)}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "userprofile.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/dislike.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
