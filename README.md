# Feature List & Bugs:

## Bugs

1. The Navbar Mode in Mobile view has icons, need equal Spacing
2. The Tables generated here needs a fast reload process, cannot use getServerSideProps in /app directory, the solutions are the use of loader in next/app (can't fix this issue)

## Additions

3. Added services/leagueMatch.ts to calculate and update table logic
4. Added a points?. : number; in models
5. Added Header and Footer

## Homepage:

1. Today's Match
2. Points Table
3. All matches data

## Admin:

1. Login/ Sign-up
2. Remove players
3. Check Inputs and field options in complete match form for better UX
4. End to End Testing
   - Single Upload
     - Venue
     - Match
     - Player
     - Teams
   - Multiple Upload
     - Venue
     - Match
     - Player
     - Teams
5. Send emails for the following:
   - Every end match
   - Every Re-schedule
   - Every Match fixture

## Changes Requested:

- [ ] Edit Match Details
- [ ] Edit Player Details
- [ ] Edit Venue Details
- [ ] Edit Team Details
- [x] Not match Fixture- Match Sequence
- [ ] Show the data that is happening in re-schedule (double confirmation)
- [x] Change from Venue ID to Venue Drop down
- [ ] In Re-schedule match -> Add 1 button for confirm and 1 button for send email to club
- [x] Not match observer -> Referee Assessor
- [x] AR1, AR2 compulsory
- [ ] Add Officials options in team
- [x] Add Combobox in every drop down
- [ ] Set up emailing

---

Player List in complete match changes:

- [ ] Player select combo box
- [ ] In the players list, add the CRS ID along with it
- [ ] Add upload team from Excel in the squad match with Registration ID
- [ ] Change the way players are selected - CHANGE DB
- [ ] GOAL KEEPER In Player List
- [ ] Captain in a match

## Reports to be Generated:

1. League Table - Standing
2. Club Performance:

- Each Match result
- All player list
- Goals, Yellow Card, Red Card

3. Player wise data:

- Number of matches played, number of goals, yellow cards, red cards
