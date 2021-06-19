// import { useEffect } from "react";
// import convoy from "utils/convoy";
import post from "data/post";
export default function Post() {
  // useEffect(() => {
  //   convoy("post/info?", {
  //     query: {
  //       post: "https://www.instagram.com/p/CG5a3RcDb8X/",
  //     },
  //     headers: {
  //       "x-rapidapi-host": "instagram-data1.p.rapidapi.com",
  //       "x-rapidapi-key": "ba205b55c5msh9296654c802e582p1795adjsnd3852393fc21",
  //     },
  //   });
  // }, []);
  return (
    <div>
      Post
      <br />
      {JSON.stringify(post)}
    </div>
  );
}
