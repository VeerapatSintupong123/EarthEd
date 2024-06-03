export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/learn","/learn/:sub*","/learn/:sub*/:id*","/learn/:sub*/:id*/edit",
    "/learn/:sub*/:id*/pre","/learn/:sub*/:id*/post",
    "/profile","/practice","/admin","/payment"]
};