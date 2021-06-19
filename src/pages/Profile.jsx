import userData from "data/user";
import { useParams } from "react-router-dom";

import MetaTitle from "components/MetaTitle";
import Header from "components/profile/Header";
import PostsCollection from "components/profile/PostsCollection";

export default function Profile() {
  const { user } = useParams();
  const {
    biography,
    businessContact,
    followedByViewer,
    followersCount,
    followingCount,
    fullName,
    posts,
    profilePicURL,
    username,
  } = userData;
  return (
    <>
      <MetaTitle title={`@${user} • Instagram`} />
      <Header
        bio={biography}
        businessContact={businessContact}
        followersCount={followersCount}
        followingCount={followingCount}
        fullName={fullName}
        isFollowing={followedByViewer}
        postsCount={posts.length}
        profilePicURL={profilePicURL}
        username={username}
      />
      <PostsCollection posts={posts} />
    </>
  );
}
