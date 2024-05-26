/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getComments } from "../server/server";
const CommentsCard = ({ item, singleCollection }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await getComments(singleCollection._id, item._id);

        setComments(response.comments);
      } catch (error) {
        console.log("Error to get comments", error);
        throw new Error();
      }
    };
    getAllComments();
  }, [comments, setComments, singleCollection._id, item._id]);

  return (
    <div className="h-[100px] w-[100%] p-4 flex-col flex-wrap overflow-scroll scrollbar bg-red-500/10">
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <div key={i}>
            <span>
              {comment.text}
              <br />
            </span>
          </div>
        ))
      ) : (
        <h4>No comment yet</h4>
      )}
    </div>
  );
};

export default CommentsCard;
