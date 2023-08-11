import { useContext, useEffect } from "react";
import { useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setposts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axiosInstance.get("/posts/profile/" + username)
        : await axiosInstance.get("/posts/timeline/" + user._id);

      console.log(res);
      setposts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
