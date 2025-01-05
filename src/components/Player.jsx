import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // Best practice to update the state based on the previous state - functional update form
    // function () => {} inside will receive LATEST state as argument
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // will be trigged every time the input field changes
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        // feeding playerNmae back into the value prop of the input element:
        value={playerName} // - and setting it to the state
        onChange={handleChange} // getting a value from the input field -
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
