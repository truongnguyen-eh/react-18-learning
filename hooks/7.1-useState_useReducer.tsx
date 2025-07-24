import { useReducer } from 'react';
import ReactDOM from 'react-dom/client';

interface GameState {
  board: string[];
  currentPlayer: 'X' | 'O';
  winner: string | null;
  gameOver: boolean;
  history: Array<{board: string[], player: 'X' | 'O', move: number}>;
  moveCount: number;
}

type GameAction = 
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'GO_TO_MOVE'; moveIndex: number }
  | { type: 'RESET_GAME' };

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

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      if (state.board[action.index] || state.gameOver) return state;
      
      const newBoard = [...state.board];
      newBoard[action.index] = state.currentPlayer;
      
      const winner = checkWinner(newBoard);
      const gameOver = Boolean(winner) || newBoard.every(cell => cell !== null);
      const moveCount = state.moveCount + 1;
      
      // All state updates happen atomically in one place!
      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        gameOver,
        moveCount,
        history: [...state.history, {
          board: newBoard,
          player: state.currentPlayer,
          move: moveCount
        }]
      };
    }
    
    case 'GO_TO_MOVE': {
      if (action.moveIndex === 0) {
        // Reset to initial state - clean and simple!
        return {
          board: Array(9).fill(null),
          currentPlayer: 'X',
          winner: null,
          gameOver: false,
          history: [],
          moveCount: 0
        };
      }
      
      const targetMove = state.history[action.moveIndex - 1];
      const winner = checkWinner(targetMove.board);
      const gameOver = Boolean(winner) || targetMove.board.every(cell => cell !== null);
      
      return {
        board: targetMove.board,
        currentPlayer: targetMove.player === 'X' ? 'O' : 'X',
        winner,
        gameOver,
        moveCount: targetMove.move,
        history: state.history.slice(0, action.moveIndex)
      };
    }
    
    case 'RESET_GAME':
      return {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        gameOver: false,
        history: [],
        moveCount: 0
      };
    
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    board: Array(9).fill(null),
    currentPlayer: 'X' as const,
    winner: null,
    gameOver: false,
    history: [],
    moveCount: 0
  });

  return (
    <div>
      <h2>useReducer Tic-Tac-Toe</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '2px' }}>
        {state.board.map((cell, index) => (
          <button
            key={index}
            onClick={() => dispatch({ type: 'MAKE_MOVE', index })}
            style={{ width: '50px', height: '50px', fontSize: '20px' }}
          >
            {cell}
          </button>
        ))}
      </div>
      
      <div>
        <p>Current Player: {state.currentPlayer}</p>
        <p>Winner: {state.winner || 'None'}</p>
        <p>Move Count: {state.moveCount}</p>
        
        <div>
          <h4>History:</h4>
          <button onClick={() => dispatch({ type: 'GO_TO_MOVE', moveIndex: 0 })}>
            Go to start
          </button>
          {state.history.map((move, index) => (
            <button 
              key={index} 
              onClick={() => dispatch({ type: 'GO_TO_MOVE', moveIndex: index + 1 })}
            >
              Go to move {move.move} ({move.player})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  if (!window['REACT_ROOT']) {
  window['REACT_ROOT'] = ReactDOM.createRoot(root)
  }
  window['REACT_ROOT'].render(<TicTacToe />);
}
