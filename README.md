# Feature List & Bugs:

## Bugs

1. Middleware error while checking if user true or not in NextAuth (mongo db)
2. Match Fixtures, venues, teams data consistency on every match, venue or team update
3. Users can log into admin page,but REDIRECT ON SIGN UP AND SIGN IN not happening

4. Player in Reserve -> Match Played add in match played
5. Re-schedule venue check -> 6 hours
6. Not less than 7 and not More than 11 in starting XI NOT Allowed
7. ONLY IN RESERVE BENCH (Not Played)
8. In Walkover - Opponent team refused to play (instead of unruly behaviour)

## Admin:

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
3. Send emails for the following:
   - [ ] Every end match
   - [ ] Every walkover match
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
- [x] If player in Reserve then not in match played

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
