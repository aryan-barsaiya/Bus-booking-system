import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log("middleware ...");
    // console.log(request.nextUrl.pathname, request.nextauth.token);
    if (
      request.nextUrl.pathname.startsWith("/add-bus") &&
      request.nextauth?.token?.role !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/register", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token?.express_token,
    },
  }
);


// add all the pages for which authrorization is required (user + admin)
export const config = {
  matcher: ["/bus", "/ticket-booking", "/my-dashboard", "/add-bus"],
};
