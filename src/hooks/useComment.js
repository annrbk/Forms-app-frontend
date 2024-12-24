import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getComments } from "../services/commentService";

export default function useComment(templateId) {
  const [comments, setComments] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const data = await getComments(token, templateId);

        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [templateId]);

  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      ws = new WebSocket("ws://localhost:5000");

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData.action === "add") {
            setComments((prevComments) => [
              ...prevComments,
              {
                from: "Server",
                text: parsedData.text,
                author: parsedData.author,
                date: parsedData.date,
              },
            ]);
          } else if (parsedData.action === "delete") {
            setComments((comments) =>
              comments.filter((comment) => comment._id !== parsedData.commentId)
            );
          }
        } catch (error) {
          console.error("Error parsing WebSocket message", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.onerror = (error) => {
        console.error("WebSocket connection error", error);
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (ws) {
        console.log("Closing WebSocket...");
        ws.close();
      }
    };
  }, [templateId]);

  const sendComment = (textComment) => {
    if (socket && socket.readyState === WebSocket.OPEN && textComment.trim()) {
      const message = JSON.stringify({
        action: "add",
        templateId,
        author: user._id,
        text: textComment,
        date: new Date(),
      });
      socket.send(message);
      setComments((prevComments) => [
        ...prevComments,
        { text: textComment, author: user._id, date: new Date() },
      ]);
    } else {
      console.error("Cannot send message");
    }
  };

  const deleteComment = (commentId) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        action: "delete",
        commentId,
      });
      socket.send(message);
    } else {
      console.error("Cannot send message");
    }
  };

  return { comments, sendComment, deleteComment };
}
