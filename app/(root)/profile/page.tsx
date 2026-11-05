import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserById } from "../../../lib/actions/user.actions";
import { getUserImages } from "../../../lib/actions/image.actions";
import Header from "../../../components/shared/Header";
import { Collection } from "../../../components/shared/Collection";



const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="profile">
        <div className="profile-balance">
          <p className="p-14-medium tracking-wide text-slate-500">
            CREDITS AVAILABLE
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="stat-icon">
              <Image src="/assets/icons/coins.svg" alt="" width={28} height={28} />
            </span>
            <h2 className="h2-bold text-gradient">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="profile-image-manipulation">
          <p className="p-14-medium tracking-wide text-slate-500">
            IMAGE MANIPULATIONS DONE
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="stat-icon">
              <Image src="/assets/icons/photo.svg" alt="" width={28} height={28} />
            </span>
            <h2 className="h2-bold text-slate-900">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data ?? []}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;
