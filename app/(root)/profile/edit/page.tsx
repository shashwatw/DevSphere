import Profile from "@/components/forms/Profile";

import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit profile | DevSphere",
  description: "Edit profile page of Dev Sphere",
};

const ProfileEdit = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};
export default ProfileEdit;
