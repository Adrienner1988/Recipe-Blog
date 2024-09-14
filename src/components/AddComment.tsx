import { useState, FormEvent } from "react";

// interface Comment {
//   id: number;
//   text: string;
//   created_at: string;
//   recipe: number;
// }

const AddComment = () => {
  const [text, setText] = useState("");


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const commentData = {
      text,
    };
  

    console.log(commentData);

    try {
      const addComment = await fetch("http://127.0.0.1:8000/api/recipes/add-comment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (addComment.ok) {
        alert("Thank you for the rating this recipe!");
      } else {
        alert("Rating not submitted, please try again.");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Tried this recipe? Leave your comment here!</h2>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className=""
        >
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            name="comment-text"
            id="comment-text"
            placeholder="Let everyone know your thoughts about this recipe ✨"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddComment;
