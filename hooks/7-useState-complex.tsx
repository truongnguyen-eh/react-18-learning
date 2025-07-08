import { useState } from 'react';
import ReactDOM from 'react-dom/client';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<Array<{board: string[], player: string, move: number}>>([]);
  const [moveCount, setMoveCount] = useState(0);

  const checkWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // This function has to manually sync 6 different state variables!
  const handleMove = (index: number) => {
    if (board[index] || gameOver) return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    
    const newWinner = checkWinner(newBoard);
    const newGameOver = Boolean(newWinner) || newBoard.every(cell => cell !== null);
    const newMoveCount = moveCount + 1;
    
    // Look at all these manual state updates - easy to mess up!
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setWinner(newWinner);
    setGameOver(newGameOver);
    setMoveCount(newMoveCount);
    
    // History update uses current values - but what if state is stale?
    setHistory([...history, {
      board: newBoard,
      player: currentPlayer,
      move: newMoveCount
    }]);
  };

  // Time travel is a nightmare with useState!
  const goToMove = (moveIndex: number) => {
    if (moveIndex === 0) {
      // Reset to initial state - 6 manual updates!
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setWinner(null);
      setGameOver(false);
      setMoveCount(0);
      setHistory([]);
    } else {
      const targetMove = history[moveIndex - 1];
      const newWinner = checkWinner(targetMove.board);
      const newGameOver = Boolean(newWinner) || targetMove.board.every(cell => cell !== null);
      
      // More manual state synchronization!
      setBoard(targetMove.board);
      setCurrentPlayer(targetMove.player === 'X' ? 'O' : 'X');
      setWinner(newWinner);
      setGameOver(newGameOver);
      setMoveCount(targetMove.move);
      setHistory(history.slice(0, moveIndex));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    setHistory([]);
    setMoveCount(0);
  };

  return (
    <div>
      <h2>useState Tic-Tac-Toe</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '2px' }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleMove(index)}
            style={{ width: '50px', height: '50px', fontSize: '20px' }}
          >
            {cell}
          </button>
        ))}
      </div>
      
      <div>
        <p>Current Player: {currentPlayer}</p>
        <p>Winner: {winner || 'None'}</p>
        <p>Move Count: {moveCount}</p>
        
        <div>
          <button onClick={resetGame} style={{ marginBottom: '10px', padding: '5px 10px' }}>
            Reset Game
          </button>
          
          <div>
            <h4>History:</h4>
            <button onClick={() => goToMove(0)}>Go to start</button>
            {history.map((move, index) => (
              <button key={index} onClick={() => goToMove(index + 1)}>
                Go to move {move.move} ({move.player})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  window['REACT_ROOT'] = ReactDOM.createRoot(root)
  window['REACT_ROOT'].render(<TicTacToe />);
}
