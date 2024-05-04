# Build Log

PS D:\My Projects\prk\football-league-management> npm run build

> league-management@0.1.0 build
> next build

   ▲ Next.js 14.1.4
   - Environments: .env

   Creating an optimized production build ...
 ⚠ Compiled with warnings

./node_modules/bcryptjs/dist/bcrypt.js
A Node.js API is used (process.nextTick at line: 351) which is not supported in the Edge Runtime.
Learn more: https://nextjs.org/docs/api-reference/edge-runtime

Import trace for requested module:
./node_modules/bcryptjs/dist/bcrypt.js
./auth.ts

./node_modules/bcryptjs/dist/bcrypt.js
A Node.js API is used (setImmediate at line: 352) which is not supported in the Edge Runtime.
Learn more: https://nextjs.org/docs/api-reference/edge-runtime

Import trace for requested module:
./node_modules/bcryptjs/dist/bcrypt.js
./auth.ts

./node_modules/bcryptjs/dist/bcrypt.js
A Node.js API is used (setImmediate at line: 352) which is not supported in the Edge Runtime.
Learn more: https://nextjs.org/docs/api-reference/edge-runtime

Import trace for requested module:
./node_modules/bcryptjs/dist/bcrypt.js
./auth.ts

./node_modules/bcryptjs/dist/bcrypt.js
A Node.js API is used (process.nextTick at line: 352) which is not supported in the Edge Runtime.
Learn more: https://nextjs.org/docs/api-reference/edge-runtime

Import trace for requested module:
./node_modules/bcryptjs/dist/bcrypt.js
./auth.ts

 ✓ Compiled successfully
   Skipping validation of types
   Skipping linting
 ✓ Collecting page data
 ✓ Generating static pages (17/17)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                                           Size     First Load JS
┌ ○ /                                                 189 B          91.3 kB
├ ○ /_not-found                                       882 B          85.2 kB
├ ○ /admin                                            188 B          91.3 kB
├ ○ /admin/match/add-fixtures                         860 B           281 kB
├ λ /admin/match/cancel/[matchId]                     293 B          89.7 kB
├ λ /admin/match/finish-match/[matchId]               3.22 kB         115 kB
├ λ /admin/match/match-details/[matchId]              186 B          96.4 kB
├ λ /admin/match/normal-finish/[matchId]              5.41 kB         149 kB
├ λ /admin/match/reschedule/[matchId]                 3.44 kB         161 kB
├ λ /admin/match/walkover/[matchId]                   3.29 kB         147 kB
├ ○ /admin/teams                                      189 B          91.3 kB
├ ○ /admin/teams/add-teams                            863 B           237 kB
├ λ /admin/teams/manage-players/[teamId]              188 B          91.3 kB
├ λ /admin/teams/manage-players/[teamId]/add-players  759 B           237 kB
├ ○ /admin/venues                                     189 B          91.3 kB
├ ○ /admin/venues/add-venues                          791 B           237 kB
├ λ /api/admin/normal-match                           0 B                0 B
├ λ /api/admin/walkover-match                         0 B                0 B
├ λ /api/auth/[...nextauth]                           0 B                0 B
├ ○ /login                                            149 B          84.5 kB
├ ○ /match                                            189 B          91.3 kB
├ ○ /sign-up                                          149 B          84.5 kB
└ ○ /table                                            189 B          91.3 kB
+ First Load JS shared by all                         84.4 kB
  ├ chunks/69-4f518c16f0e00153.js                     29 kB
  ├ chunks/fd9d1056-cef671d3e240ecc8.js               53.4 kB
  └ other shared chunks (total)                       1.97 kB


ƒ Middleware                                          95 kB

○  (Static)   prerendered as static content
λ  (Dynamic)  server-rendered on demand using Node.js