import userData from "data/user";

import MetaTitle from "components/MetaTitle";
import Header from "components/profile/Header";
import { useParams } from "react-router-dom";

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
    </>
  );
}
