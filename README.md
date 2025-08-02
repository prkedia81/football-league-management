# Feature List & Bugs:
./app/layout.tsx
[API Upload] Received request for URL: http://localhost:3000/api/upload
[API Upload] Processing: Parsing form data...
[API Upload] Raw path from FormData: "null"
[API Upload] Path before sanitization: "uploads/documents/"
[API Upload] Processing: Calling FTP service with sanitized path: "uploads/documents/"
[FTP Service] 'uploadFile' method initiated.
[FTP Service] Full remote path will be: "uploads/documents/match1.pdf"
[FTP Service] Connecting with config: {
  host: 'ftp.teqv.in',
  port: 21,
  user: 'ifa-uploads@kickoffonline.in',
  password: '***',
  secure: false
}
[FTP Service] Connection successful.
[FTP Service] Ensuring directory exists: "uploads/documents/"
[FTP Service] Directory check complete.
[FTP Service] Starting upload to "uploads/documents/match1.pdf"...
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
    at Socket.emit (node:events:524:28)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
    at Socket.emit (node:events:524:28)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
    at Socket.emit (node:events:524:28)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
[FTP Service] An error occurred during FTP operation: FTPError: 553 Can't open that file: No such file or directory
    at FTPContext._onControlSocketData (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:283:39)
    at Socket.eval (webpack-internal:///(rsc)/./node_modules/basic-ftp/dist/FtpContext.js:127:44)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:189:23)
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17) {
  code: 553
}
[FTP Service] Closing FTP client connection.
[API Upload] Block Failed: FTP service returned failure: 553 Can't open that file: No such file or directory
 POST /api/upload 500 in 4033ms

## Updates Required

1. Add forgot password
2. Add multi league management

## Feature List:

1. Login/ Sign-up
2. End to End Testing

   - Single Upload
     - Match
     - Venue
     - Player
     - Teams
     - Officials
   - Multiple Upload
     - Venue
     - Match
     - Player
     - Teams
     - Officials
   - Matches:
     - Re-schedule Conflict
     - Re-schedule Success + Email
     - Match Cancelled
     - Match Walkover
     - Match Walkover Edit Penalty
     - Match Normal Finish with Red Cards, Yellow Cards, Goals etc
     - Match Details Page

3. Send emails for the following:
   - [x] Every end match
   - [x] Every walkover match
   - [x] Every cancel match
   - [x] Every Re-schedule
   - [ ] Every Match fixture
4. Show penalty in match details page

## Changes Requested:

- [x] Edit Match Details after complete in not normal match -> Option to edit penalty points
- [x] Set up points count after match end
- [x] Set up emailing
- [x] Referee Report Upload - 1 Image or 1 PDF
- [x] Add Officials options in team
- [x] Show the data that is happening in re-schedule (double confirmation)
- [x] In Re-schedule match -> Add 1 button for confirm and 1 button for send email to club
- [x] Not match Fixture - Match Sequence
- [x] Change from Venue ID to Venue Drop down
- [x] Not match observer -> Referee Assessor
- [x] AR1, AR2 compulsory
- [x] Add Combobox in every drop down
- [x] OG in own goal -> Showed team name instead
- [x] If player in Reserve then also in match played
- [x] Not less than 7 and not More than 11 in starting XI NOT Allowed
- [x] Re-schedule venue check -> 6 hours
- [x] In Walkover - Opponent team refused to play (instead of unruly behaviour)
- [x] Check match display page
- [x] Match Fixtures, venues, teams data consistency on every match, venue or team update
- [x] Add players unique replacement
- [x] Add matches unique replacement
- [x] Add simple UI for front-end match viewing

---

Player List in complete match changes:

- [x] Player select combo box
- [x] In the players list, add the CRS ID along with it
- [ ] Add officials in red card, yellow card area
- [x] Change the way players are selected -> GOAL KEEPER, Captain In Player List
- [x] Update DB

## Reports to be Generated:

- [x] League Table - Standing
- [x] Penalty In League Table
- [x] Club Performance:

  - Each Match result
  - All player list
  - Goals, Yellow Card, Red Card

- [x] Player wise data:
  - Number of matches played, number of goals, yellow cards, red cards

## Future Versions:

- Type Safety in upload section -> excel upload, single
- Add upload team from Excel in the squad match with Registration ID
- Edit Player Details
- Edit Venue Details
- Edit Team Details
- Only show selected players in the drop down for match finish
- New Users from Logged in Users


## To Run:
- (For DEV) type ```NEXT_OTEL=1 npm run dev``` on terminal and get started
- ```docker-compose up -d```