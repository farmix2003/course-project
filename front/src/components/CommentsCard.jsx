/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getComments } from "../server/server";
const CommentsCard = ({ item, singleCollection }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await getComments(singleCollection._id, item._id);
        console.log(response);
        setComments(response.comments);
      } catch (error) {
        console.log("Error to get comments", error);
        throw new Error();
      }
    };
    getAllComments();
  }, [comments, setComments, singleCollection._id, item._id]);

  return (
    <div>
      {comments.map((comment, i) => (
        <span key={i}>{comment.text}</span>
      ))}
    </div>
  );
};

export default CommentsCard;
