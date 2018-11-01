import React from 'react';

export default ({alive, newBorn, running, handleClick}) =>
(
    <td
        onClick={running > 0 ? '' : handleClick }
        className={`${alive ? 'alive' : 'dead'} ${newBorn ? 'new-born': ''}`}
      // TODO: Write ternary or other conditional statement to prevent cell from being clicked during the playing of the game.
      >
    </td>
  )