export function toggleAlive(x,y) {
  return {
    type: 'TOGGLE_ALIVE',
    x,
    y
  };
}