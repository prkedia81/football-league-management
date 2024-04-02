import PlayersDropdown from '@/components/admin/finishMatchForm/PlayerDropdown/playerDropdown';

export function Scorer() {
 const players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
 ];

 return (
    <PlayersDropdown players={players}>
      <div>This is some content inside the PlayersDropdown component.</div>
    </PlayersDropdown>
 );
}
