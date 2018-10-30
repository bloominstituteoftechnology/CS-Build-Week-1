import React from 'react';

export default ({alive, newBorn, handleClick}) =>
  (
    <td
      onClick={handleClick}
      className={`${alive ? 'alive' : ''} ${newBorn ? 'new-born': ''}`}
      // TODO: Write ternary or other conditional statement to prevent cell from being clicked during the playing of the game.
      >
    </td>
  )