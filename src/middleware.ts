export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/learn","/learn/:id*","/profile","/practice","/admin"]
};