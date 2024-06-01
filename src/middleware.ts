export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/learn","/learn/:id*","/learn/:id*/edit","/learn/:id*/pre","/learn/:id*/post",
    "/profile","/practice","/admin","/payment"]
};