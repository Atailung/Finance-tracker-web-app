import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/dashboard']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

 export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}





// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/dashboard']);

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     try {
//       // Log current system time for debugging
//       console.log('System time in middleware:', new Date().toISOString());
//       await auth.protect();
//     } catch (error) {
//       // Handle clock skew error
//       if (error.message?.includes('token-not-active-yet')) {
//         console.warn('Clock skew detected:', {
//           error: error.message,
//           systemTime: new Date().toISOString(),
//         });
//         // Option 1: Redirect to an error page
//         return NextResponse.redirect(
//           new URL('/error?message=Clock%20skew%20detected,%20please%20sync%20your%20system%20clock', req.url)
//         );
//         // Option 2: Suggest retry after a delay
//         // const response = NextResponse.next();
//         // response.headers.set('Retry-After', '10'); // Retry after 10 seconds
//         // return response;
//       }
//       // Rethrow other errors
//       throw error;
//     }
//   }
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };