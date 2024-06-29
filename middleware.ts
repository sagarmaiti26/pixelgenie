import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk", "/api/webhook/stripe"],
  ignoredRoutes:["/api/webhook/clerk"]
});

export const config = {
  matcher: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)"],
};