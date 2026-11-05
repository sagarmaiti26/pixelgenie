import { SignedIn} from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { plans } from "../../../constants";
import { cn } from "../../../lib/utils";
import Header from "../../../components/shared/Header";
import { getUserById } from "../../../lib/actions/user.actions";
import Checkout from "../../../components/shared/Checkout";



const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="credits-list">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "credits-item",
                plan.name === "Pro Package" && "credits-item_featured"
              )}
            >
              {plan.name === "Pro Package" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-pink px-3 py-1 text-xs font-semibold text-white shadow-glow">
                  Most popular
                </span>
              )}
              <div className="flex-center flex-col gap-3">
                <span className="stat-icon size-14">
                  <Image src={plan.icon} alt="" width={32} height={32} />
                </span>
                <p className="p-18-semibold mt-2 text-gradient">{plan.name}</p>
                <p className="h1-semibold font-bold text-slate-900">
                  ₹{plan.price}
                </p>
                <p className="p-16-regular text-slate-500">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-1 flex-col gap-4 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "cross.svg"
                      }`}
                      alt={inclusion.isIncluded ? "Included" : "Not included"}
                      width={22}
                      height={22}
                    />
                    <p
                      className={cn(
                        "p-16-regular",
                        inclusion.isIncluded ? "text-slate-700" : "text-slate-400"
                      )}
                    >
                      {inclusion.label}
                    </p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <button type="button" className="credits-btn" disabled>
                  Free Consumable
                </button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
