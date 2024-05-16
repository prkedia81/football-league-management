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

# Changes Requested:

- [ ] Edit Match Details
- [ ] Edit Player Details

3. [] Edit Venue Details
4. [] Edit Team Details
5. [] Not match Fixture- Match Sequence
6. [] Show the data that is happening in re-schedule (double confirmation)
7. [] Change from Venue ID to Venue Drop down (with typing)
8. [] In Re-schedule match -> Add 1 button for confirm and 1 button for send email to club
9. [] Not match observer -> Referee Assessor
10. [] AR1, AR2 compulsory
11. [] Add upload team from Excel in the squad match with Registration ID
12. [] In the players list, add the CRS ID along with it
13. [] GOAL KEEPER In Player List
14. [] Captain in a match
15. [] Change the way players are selected
16. [] Add Officials options in team

# Reports to be Generated:

1. League Table - Standing
2. Club Performance:

- Each Match result
- All player list
- Goals, Yellow Card, Red Card

3. Player wise data:

- Number of matches played, number of goals, yellow cards, red cards
