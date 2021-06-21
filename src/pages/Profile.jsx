import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MetaTitle from "components/MetaTitle";
import Header from "components/profile/Header";
import PostsCollection from "components/profile/PostsCollection";

export default function Profile() {
  /**
   * Ideally username should be taken from profileDetails
   * this is simply to demonstrate the use of route params
   */
  const { username } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    let profileDetails = JSON.parse(localStorage.getItem("profileDetails"));
    (async () => {
      if (!profileDetails) {
        const module = await import("data/profileDetails.json");
        profileDetails = module.default;
        localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
      }
      setData(profileDetails);
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return "Loading...";

  const {
    biography,
    businessContact,
    followedByViewer,
    followers,
    following,
    fullName,
    posts,
    postsCount,
    profilePicURL,
  } = data;
  return (
    <>
      <MetaTitle title={`@${username} • Instagram`} />
      <Header
        bio={biography}
        businessContact={businessContact}
        followers={followers}
        following={following}
        fullName={fullName}
        isFollowing={followedByViewer}
        postsCount={postsCount}
        profilePicURL={profilePicURL}
        username={username}
      />
      <PostsCollection posts={posts} />
    </>
  );
}
