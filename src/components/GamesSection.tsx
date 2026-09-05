import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Bot,
  User,
  Flame,
  Volume2,
  VolumeX,
  Play,
  Award,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

type GameType = "menu" | "tictactoe" | "2048" | "snake" | "memory";

interface GamesSectionProps {
  onClose?: () => void;
}

export const GamesSection: React.FC<GamesSectionProps> = () => {
  const [activeGame, setActiveGame] = useState<GameType>("menu");

  // High Scores in localStorage
  const [highScores, setHighScores] = useState<{
    snake: number;
    game2048: number;
    tttWins: number;
    memoryBestMoves: number;
  }>(() => {
    try {
      return {
        snake: parseInt(localStorage.getItem("wavegram_game_snake_hi") || "0", 10),
        game2048: parseInt(localStorage.getItem("wavegram_game_2048_hi") || "0", 10),
        tttWins: parseInt(localStorage.getItem("wavegram_game_ttt_wins") || "0", 10),
        memoryBestMoves: parseInt(localStorage.getItem("wavegram_game_memory_hi") || "0", 10)
      };
    } catch {
      return { snake: 0, game2048: 0, tttWins: 0, memoryBestMoves: 0 };
    }
  });

  const updateHighScore = (key: keyof typeof highScores, value: number) => {
    setHighScores((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        if (key === "snake") localStorage.setItem("wavegram_game_snake_hi", value.toString());
        if (key === "game2048") localStorage.setItem("wavegram_game_2048_hi", value.toString());
        if (key === "tttWins") localStorage.setItem("wavegram_game_ttt_wins", value.toString());
        if (key === "memoryBestMoves") localStorage.setItem("wavegram_game_memory_hi", value.toString());
      } catch {}
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 text-slate-100 p-1">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#202b36]">
        <div className="flex items-center gap-2.5">
          {activeGame !== "menu" && (
            <button
              onClick={() => setActiveGame("menu")}
              className="p-1.5 rounded-lg bg-[#202b36] hover:bg-[#2c3b4a] text-slate-200 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-900/30">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {activeGame === "menu" && "Wavegram Arcade"}
                {activeGame === "tictactoe" && "Tic-Tac-Toe vs MK.ia"}
                {activeGame === "2048" && "2048 Puzzle"}
                {activeGame === "snake" && "Retro Snake Arcade"}
                {activeGame === "memory" && "Memory Match"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {activeGame === "menu"
                  ? "Enjoy quick multiplayer & puzzle mini-games directly in Settings"
                  : "Play & relax right within your messaging workspace"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Content Area */}
      {activeGame === "menu" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 1. Tic-Tac-Toe */}
          <div
            onClick={() => setActiveGame("tictactoe")}
            className="p-4 rounded-2xl bg-[#1c2734] border border-[#273546] hover:border-amber-500/50 hover:bg-[#202c3b] transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xl font-black shadow-md shadow-indigo-900/40 group-hover:scale-105 transition-transform">
                ✕ ○
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Vs MK.ia AI
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Tic-Tac-Toe
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Challenge MK.ia AI or play 2-player local pass-and-play.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-[#273546] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{highScores.tttWins} wins</span>
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Play <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </div>

          {/* 2. 2048 Puzzle */}
          <div
            onClick={() => setActiveGame("2048")}
            className="p-4 rounded-2xl bg-[#1c2734] border border-[#273546] hover:border-amber-500/50 hover:bg-[#202c3b] transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-base font-black shadow-md shadow-orange-900/40 group-hover:scale-105 transition-transform">
                2048
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Puzzle
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                2048 Numbers
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Slide matching numbered tiles to reach the legendary 2048 tile.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-[#273546] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>Best: {highScores.game2048}</span>
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Play <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </div>

          {/* 3. Snake */}
          <div
            onClick={() => setActiveGame("snake")}
            className="p-4 rounded-2xl bg-[#1c2734] border border-[#273546] hover:border-amber-500/50 hover:bg-[#202c3b] transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-xl shadow-md shadow-emerald-900/40 group-hover:scale-105 transition-transform">
                🐍
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Arcade
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Classic Snake
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Navigate the glowing snake, collect power energy, and beat high score.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-[#273546] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>Best: {highScores.snake}</span>
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Play <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </div>

          {/* 4. Memory Match */}
          <div
            onClick={() => setActiveGame("memory")}
            className="p-4 rounded-2xl bg-[#1c2734] border border-[#273546] hover:border-amber-500/50 hover:bg-[#202c3b] transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl shadow-md shadow-purple-900/40 group-hover:scale-105 transition-transform">
                🃏
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Memory
              </span>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Emoji Memory Cards
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Test your memory by flipping and pairing Wavegram emoji symbols.
              </p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-[#273546] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Award className="w-3.5 h-3.5" />
                <span>{highScores.memoryBestMoves ? `Best: ${highScores.memoryBestMoves} moves` : "Unplayed"}</span>
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Play <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 1. TIC TAC TOE */}
      {activeGame === "tictactoe" && (
        <TicTacToeGame
          winsCount={highScores.tttWins}
          onWin={() => updateHighScore("tttWins", highScores.tttWins + 1)}
        />
      )}

      {/* 2. 2048 PUZZLE */}
      {activeGame === "2048" && (
        <Game2048
          highScore={highScores.game2048}
          onUpdateHighScore={(score) => updateHighScore("game2048", score)}
        />
      )}

      {/* 3. RETRO SNAKE */}
      {activeGame === "snake" && (
        <SnakeGame
          highScore={highScores.snake}
          onUpdateHighScore={(score) => updateHighScore("snake", score)}
        />
      )}

      {/* 4. MEMORY MATCH */}
      {activeGame === "memory" && (
        <MemoryGame
          bestMoves={highScores.memoryBestMoves}
          onRecordBest={(moves) => {
            if (highScores.memoryBestMoves === 0 || moves < highScores.memoryBestMoves) {
              updateHighScore("memoryBestMoves", moves);
            }
          }}
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * 1. TIC TAC TOE MINI-GAME
 * ----------------------------------------------------------- */
interface TicTacToeProps {
  winsCount: number;
  onWin: () => void;
}

const TicTacToeGame: React.FC<TicTacToeProps> = ({ winsCount, onWin }) => {
  const [board, setBoard] = useState<Array<"X" | "O" | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<"ai" | "pvp">("ai");
  const [aiDifficulty, setAiDifficulty] = useState<"smart" | "easy">("smart");
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ x: winsCount, o: 0, draws: 0 });

  const checkWinner = (squares: Array<"X" | "O" | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (squares.every((sq) => sq !== null)) {
      return { winner: "draw" as const, line: null };
    }
    return null;
  };

  const getBestAiMove = (currentBoard: Array<"X" | "O" | null>) => {
    const emptyIndices: number[] = [];
    currentBoard.forEach((cell, idx) => {
      if (!cell) emptyIndices.push(idx);
    });

    if (emptyIndices.length === 0) return -1;

    // Easy mode: random pick
    if (aiDifficulty === "easy") {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    // 1. Can AI (O) win right now?
    for (const idx of emptyIndices) {
      const copy = [...currentBoard];
      copy[idx] = "O";
      if (checkWinner(copy)?.winner === "O") return idx;
    }

    // 2. Can player (X) win next move? Block them!
    for (const idx of emptyIndices) {
      const copy = [...currentBoard];
      copy[idx] = "X";
      if (checkWinner(copy)?.winner === "X") return idx;
    }

    // 3. Take center if open
    if (emptyIndices.includes(4)) return 4;

    // 4. Take corners
    const corners = [0, 2, 6, 8].filter((c) => emptyIndices.includes(c));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // 5. Fallback
    return emptyIndices[0];
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const res = checkWinner(newBoard);
    if (res) {
      setWinner(res.winner);
      setWinningLine(res.line);
      if (res.winner === "X") {
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
        onWin();
      } else if (res.winner === "O") {
        setScores((prev) => ({ ...prev, o: prev.o + 1 }));
      } else {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }
      return;
    }

    // If playing against AI and it was X's turn
    if (gameMode === "ai" && isXNext) {
      setIsXNext(false);
      setTimeout(() => {
        setBoard((prevBoard) => {
          const aiMove = getBestAiMove(prevBoard);
          if (aiMove === -1) return prevBoard;
          const aiBoard = [...prevBoard];
          aiBoard[aiMove] = "O";

          const aiRes = checkWinner(aiBoard);
          if (aiRes) {
            setWinner(aiRes.winner);
            setWinningLine(aiRes.line);
            if (aiRes.winner === "O") {
              setScores((s) => ({ ...s, o: s.o + 1 }));
            } else if (aiRes.winner === "draw") {
              setScores((s) => ({ ...s, draws: s.draws + 1 }));
            }
          }
          setIsXNext(true);
          return aiBoard;
        });
      }, 350);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {/* Modes & Settings */}
      <div className="flex items-center justify-between w-full bg-[#1c2734] p-1.5 rounded-xl border border-[#273546] text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setGameMode("ai");
              handleReset();
            }}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
              gameMode === "ai" ? "bg-cyan-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Vs MK.ia
          </button>
          <button
            onClick={() => {
              setGameMode("pvp");
              handleReset();
            }}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
              gameMode === "pvp" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            2-Player
          </button>
        </div>

        {gameMode === "ai" && (
          <button
            onClick={() => setAiDifficulty(aiDifficulty === "smart" ? "easy" : "smart")}
            className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#273546] text-amber-300 hover:bg-[#324357]"
          >
            {aiDifficulty === "smart" ? "⚡ Smart AI" : "🌱 Casual"}
          </button>
        )}
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-3 gap-2 w-full text-center">
        <div className="bg-[#1c2734] p-2 rounded-xl border border-cyan-500/20">
          <div className="text-[10px] text-cyan-400 font-bold">Player (X)</div>
          <div className="text-base font-black text-white">{scores.x}</div>
        </div>
        <div className="bg-[#1c2734] p-2 rounded-xl border border-slate-700">
          <div className="text-[10px] text-slate-400 font-bold">Draws</div>
          <div className="text-base font-black text-slate-300">{scores.draws}</div>
        </div>
        <div className="bg-[#1c2734] p-2 rounded-xl border border-rose-500/20">
          <div className="text-[10px] text-rose-400 font-bold">
            {gameMode === "ai" ? "MK.ia (O)" : "Player (O)"}
          </div>
          <div className="text-base font-black text-white">{scores.o}</div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-[#131d27] rounded-2xl border border-[#273546] shadow-xl w-full aspect-square max-w-[280px]">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine?.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={!!cell || !!winner}
              className={`aspect-square rounded-xl text-3xl font-black flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                cell === "X"
                  ? isWinningCell
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50 scale-105"
                    : "bg-[#1f2d3d] text-cyan-400 shadow-inner"
                  : cell === "O"
                  ? isWinningCell
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-105"
                    : "bg-[#1f2d3d] text-rose-400 shadow-inner"
                  : "bg-[#1c2734] hover:bg-[#253447] text-transparent"
              }`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Status & Restart */}
      <div className="flex items-center justify-between w-full px-1">
        <div className="text-xs font-bold">
          {winner === "X" && <span className="text-cyan-400">🎉 Player X Wins!</span>}
          {winner === "O" && (
            <span className="text-rose-400">
              {gameMode === "ai" ? "🤖 MK.ia Wins!" : "🎉 Player O Wins!"}
            </span>
          )}
          {winner === "draw" && <span className="text-amber-400">🤝 Good game! It's a draw.</span>}
          {!winner && (
            <span className="text-slate-300">
              Turn:{" "}
              <span className={isXNext ? "text-cyan-400 font-bold" : "text-rose-400 font-bold"}>
                {isXNext ? "X" : "O"}
              </span>
            </span>
          )}
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl bg-[#202b36] hover:bg-[#2a3a49] text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. 2048 PUZZLE MINI-GAME
 * ----------------------------------------------------------- */
interface Game2048Props {
  highScore: number;
  onUpdateHighScore: (score: number) => void;
}

const Game2048: React.FC<Game2048Props> = ({ highScore, onUpdateHighScore }) => {
  const [grid, setGrid] = useState<number[][]>(() => initGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  function initGrid(): number[][] {
    const g = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    addRandomTile(g);
    addRandomTile(g);
    return g;
  }

  function addRandomTile(g: number[][]) {
    const empty: [number, number][] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (g[r][c] === 0) empty.push([r, c]);
      }
    }
    if (empty.length > 0) {
      const [r, c] = empty[Math.floor(Math.random() * empty.length)];
      g[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const slideRow = (row: number[]) => {
    let arr = row.filter((val) => val !== 0);
    let pts = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        pts += arr[i];
        arr.splice(i + 1, 1);
      }
    }
    while (arr.length < 4) {
      arr.push(0);
    }
    return { arr, pts };
  };

  const move = useCallback(
    (direction: "left" | "right" | "up" | "down") => {
      if (gameOver) return;

      let changed = false;
      let addedScore = 0;
      const newGrid = grid.map((r) => [...r]);

      if (direction === "left") {
        for (let r = 0; r < 4; r++) {
          const { arr, pts } = slideRow(newGrid[r]);
          if (arr.some((val, idx) => val !== newGrid[r][idx])) changed = true;
          newGrid[r] = arr;
          addedScore += pts;
        }
      } else if (direction === "right") {
        for (let r = 0; r < 4; r++) {
          const reversed = [...newGrid[r]].reverse();
          const { arr, pts } = slideRow(reversed);
          const back = arr.reverse();
          if (back.some((val, idx) => val !== newGrid[r][idx])) changed = true;
          newGrid[r] = back;
          addedScore += pts;
        }
      } else if (direction === "up") {
        for (let c = 0; c < 4; c++) {
          const col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
          const { arr, pts } = slideRow(col);
          for (let r = 0; r < 4; r++) {
            if (newGrid[r][c] !== arr[r]) changed = true;
            newGrid[r][c] = arr[r];
          }
          addedScore += pts;
        }
      } else if (direction === "down") {
        for (let c = 0; c < 4; c++) {
          const col = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]];
          const { arr, pts } = slideRow(col);
          for (let r = 0; r < 4; r++) {
            if (newGrid[3 - r][c] !== arr[r]) changed = true;
            newGrid[3 - r][c] = arr[r];
          }
          addedScore += pts;
        }
      }

      if (changed) {
        addRandomTile(newGrid);
        setGrid(newGrid);
        const nextScore = score + addedScore;
        setScore(nextScore);
        if (nextScore > highScore) {
          onUpdateHighScore(nextScore);
        }

        // Check 2048 win
        if (!won && newGrid.some((row) => row.includes(2048))) {
          setWon(true);
        }

        // Check game over
        let canMove = false;
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            if (newGrid[r][c] === 0) canMove = true;
            if (r < 3 && newGrid[r][c] === newGrid[r + 1][c]) canMove = true;
            if (c < 3 && newGrid[r][c] === newGrid[r][c + 1]) canMove = true;
          }
        }
        if (!canMove) {
          setGameOver(true);
        }
      }
    },
    [gameOver, grid, highScore, onUpdateHighScore, score, won]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        move("left");
      } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        move("right");
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        move("up");
      } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        move("down");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const resetGame = () => {
    setGrid(initGrid());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const getTileColor = (val: number) => {
    switch (val) {
      case 2:
        return "bg-slate-700 text-slate-100";
      case 4:
        return "bg-slate-600 text-amber-200";
      case 8:
        return "bg-amber-600 text-white font-bold";
      case 16:
        return "bg-orange-600 text-white font-bold";
      case 32:
        return "bg-red-600 text-white font-bold";
      case 64:
        return "bg-rose-600 text-white font-black";
      case 128:
        return "bg-yellow-500 text-slate-900 font-black shadow-md shadow-yellow-500/50";
      case 256:
        return "bg-yellow-400 text-slate-900 font-black shadow-lg shadow-yellow-400/50";
      case 512:
        return "bg-emerald-500 text-white font-black shadow-lg shadow-emerald-500/50";
      case 1024:
        return "bg-cyan-500 text-white font-black shadow-lg shadow-cyan-500/50";
      case 2048:
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-xl shadow-purple-500/50 scale-105";
      default:
        return "bg-[#182330] text-transparent";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {/* Score Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="bg-[#1c2734] px-3 py-1.5 rounded-xl border border-[#273546] text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Score</div>
            <div className="text-sm font-black text-amber-400">{score}</div>
          </div>
          <div className="bg-[#1c2734] px-3 py-1.5 rounded-xl border border-[#273546] text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Best</div>
            <div className="text-sm font-black text-cyan-400">{highScore}</div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="px-3 py-2 rounded-xl bg-[#202b36] hover:bg-[#2c3b4a] text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>
      </div>

      {/* 4x4 Grid Container */}
      <div className="relative p-3 bg-[#111923] rounded-2xl border border-[#273546] shadow-xl w-full aspect-square max-w-[280px]">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
          {grid.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`w-full h-full rounded-xl flex items-center justify-center text-sm sm:text-base font-bold transition-all select-none ${getTileColor(
                  val
                )}`}
              >
                {val > 0 ? val : ""}
              </div>
            ))
          )}
        </div>

        {/* Game Over / Win Overlay */}
        {(gameOver || won) && (
          <div className="absolute inset-0 rounded-2xl bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in">
            <div className="text-2xl mb-1">{won ? "🏆" : "💥"}</div>
            <h4 className="text-base font-black text-white">
              {won ? "You Reached 2048!" : "Game Over"}
            </h4>
            <p className="text-xs text-slate-400 mt-1 mb-3">
              Final score: <span className="font-bold text-amber-400">{score}</span>
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-900/40 hover:scale-105 active:scale-95 transition-all"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Direction Buttons for Mobile / Touch */}
      <div className="flex flex-col items-center gap-1 w-full max-w-[180px]">
        <button
          onClick={() => move("up")}
          className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-cyan-600 text-slate-200 transition-all shadow cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => move("left")}
            className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-cyan-600 text-slate-200 transition-all shadow cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => move("down")}
            className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-cyan-600 text-slate-200 transition-all shadow cursor-pointer"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => move("right")}
            className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-cyan-600 text-slate-200 transition-all shadow cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <span className="text-[10px] text-slate-500 mt-1">Use arrows or buttons</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. RETRO SNAKE MINI-GAME
 * ----------------------------------------------------------- */
interface SnakeGameProps {
  highScore: number;
  onUpdateHighScore: (score: number) => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ highScore, onUpdateHighScore }) => {
  const GRID_SIZE = 15;
  const [snake, setSnake] = useState<Array<[number, number]>>([
    [7, 7],
    [7, 6],
    [7, 5]
  ]);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const [food, setFood] = useState<[number, number]>([4, 4]);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  const generateFood = useCallback((currentSnake: Array<[number, number]>): [number, number] => {
    let newFood: [number, number];
    while (true) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (!currentSnake.some(([sr, sc]) => sr === r && sc === c)) {
        newFood = [r, c];
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake: Array<[number, number]> = [
      [7, 7],
      [7, 6],
      [7, 5]
    ];
    setSnake(initialSnake);
    setDirection("RIGHT");
    setFood(generateFood(initialSnake));
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        if (directionRef.current !== "DOWN") setDirection("UP");
      } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        if (directionRef.current !== "UP") setDirection("DOWN");
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        if (directionRef.current !== "RIGHT") setDirection("LEFT");
      } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        if (directionRef.current !== "LEFT") setDirection("RIGHT");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: [number, number];

        switch (directionRef.current) {
          case "UP":
            newHead = [head[0] - 1, head[1]];
            break;
          case "DOWN":
            newHead = [head[0] + 1, head[1]];
            break;
          case "LEFT":
            newHead = [head[0], head[1] - 1];
            break;
          case "RIGHT":
            newHead = [head[0], head[1] + 1];
            break;
        }

        // Check wall collision
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(([r, c]) => r === newHead[0] && c === newHead[1])) {
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => {
            const next = s + 10;
            if (next > highScore) onUpdateHighScore(next);
            return next;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 140);

    return () => clearInterval(interval);
  }, [food, generateFood, highScore, isGameOver, isPlaying, onUpdateHighScore]);

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="bg-[#1c2734] px-3 py-1.5 rounded-xl border border-[#273546] text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Score</div>
            <div className="text-sm font-black text-emerald-400">{score}</div>
          </div>
          <div className="bg-[#1c2734] px-3 py-1.5 rounded-xl border border-[#273546] text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Best</div>
            <div className="text-sm font-black text-amber-400">{highScore}</div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-lg shadow-emerald-900/30"
        >
          {isPlaying ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? "Restart" : "Start"}</span>
        </button>
      </div>

      {/* Snake Canvas Grid */}
      <div className="relative p-2 bg-[#0d141e] rounded-2xl border border-[#273546] shadow-xl w-full aspect-square max-w-[280px]">
        <div
          className="grid gap-[1px] w-full h-full bg-[#141f2d] rounded-xl overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const r = Math.floor(idx / GRID_SIZE);
            const c = idx % GRID_SIZE;
            const isHead = snake[0][0] === r && snake[0][1] === c;
            const isBody = snake.some(([sr, sc]) => sr === r && sc === c);
            const isFood = food[0] === r && food[1] === c;

            return (
              <div
                key={idx}
                className={`w-full h-full rounded-[2px] transition-colors ${
                  isHead
                    ? "bg-emerald-400 shadow-sm shadow-emerald-400"
                    : isBody
                    ? "bg-emerald-600"
                    : isFood
                    ? "bg-rose-500 animate-pulse rounded-full"
                    : "bg-[#0d141e]"
                }`}
              />
            );
          })}
        </div>

        {/* Start / Game Over Dialog */}
        {(!isPlaying || isGameOver) && (
          <div className="absolute inset-0 rounded-2xl bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in">
            <div className="text-3xl mb-1">{isGameOver ? "💀" : "🐍"}</div>
            <h4 className="text-base font-black text-white">
              {isGameOver ? "Game Over!" : "Snake Arcade"}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 mb-3">
              {isGameOver ? `You scored ${score} points` : "Guide the snake with keys or buttons"}
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all"
            >
              {isGameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>

      {/* D-Pad Controls */}
      <div className="flex flex-col items-center gap-1 w-full max-w-[180px]">
        <button
          onClick={() => {
            if (directionRef.current !== "DOWN") setDirection("UP");
          }}
          className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-emerald-600 text-slate-200 transition-all shadow cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (directionRef.current !== "RIGHT") setDirection("LEFT");
            }}
            className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-emerald-600 text-slate-200 transition-all shadow cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (directionRef.current !== "UP") setDirection("DOWN");
            }}
            className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-emerald-600 text-slate-200 transition-all shadow cursor-pointer"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (directionRef.current !== "LEFT") setDirection("RIGHT");
            }}
            className="p-2.5 rounded-xl bg-[#1c2734] hover:bg-[#29394c] active:bg-emerald-600 text-slate-200 transition-all shadow cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. MEMORY MATCH MINI-GAME
 * ----------------------------------------------------------- */
interface MemoryGameProps {
  bestMoves: number;
  onRecordBest: (moves: number) => void;
}

const EMOJI_SYMBOLS = ["⚡", "🚀", "💎", "👑", "🎮", "🦄", "🌟", "🍕"];

interface CardItem {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ bestMoves, onRecordBest }) => {
  const [cards, setCards] = useState<CardItem[]>(() => setupCards());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  function setupCards(): CardItem[] {
    const list: CardItem[] = [];
    const pool = [...EMOJI_SYMBOLS, ...EMOJI_SYMBOLS];
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.forEach((sym, idx) => {
      list.push({ id: idx, symbol: sym, isFlipped: false, isMatched: false });
    });
    return list;
  }

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(newCards);

    const nextFlipped = [...flippedIds, id];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = nextFlipped;
      const firstCard = newCards.find((c) => c.id === firstId);
      const secondCard = newCards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Matched
        setTimeout(() => {
          setCards((prev) => {
            const updated = prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            );
            if (updated.every((c) => c.isMatched)) {
              setIsWon(true);
              onRecordBest(moves + 1);
            }
            return updated;
          });
          setFlippedIds([]);
        }, 300);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c))
          );
          setFlippedIds([]);
        }, 900);
      }
    }
  };

  const restartGame = () => {
    setCards(setupCards());
    setFlippedIds([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="bg-[#1c2734] px-3 py-1.5 rounded-xl border border-[#273546] text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Moves</div>
            <div className="text-sm font-black text-purple-400">{moves}</div>
          </div>
          <div className="bg-[#1c2734] px-3 py-1.5 rounded-xl border border-[#273546] text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Best</div>
            <div className="text-sm font-black text-amber-400">
              {bestMoves ? `${bestMoves} moves` : "--"}
            </div>
          </div>
        </div>

        <button
          onClick={restartGame}
          className="px-3 py-2 rounded-xl bg-[#202b36] hover:bg-[#2c3b4a] text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Shuffle</span>
        </button>
      </div>

      {/* 4x4 Cards Grid */}
      <div className="relative p-3 bg-[#111923] rounded-2xl border border-[#273546] shadow-xl w-full aspect-square max-w-[280px]">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || card.isFlipped}
              className={`w-full h-full rounded-xl flex items-center justify-center text-xl transition-all select-none cursor-pointer duration-200 ${
                card.isMatched
                  ? "bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm"
                  : card.isFlipped
                  ? "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40 rotate-y-180"
                  : "bg-[#1c2734] hover:bg-[#253447] text-transparent hover:scale-105 active:scale-95"
              }`}
            >
              {card.isFlipped || card.isMatched ? card.symbol : "✨"}
            </button>
          ))}
        </div>

        {/* Win overlay */}
        {isWon && (
          <div className="absolute inset-0 rounded-2xl bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in">
            <div className="text-3xl mb-1">🎉</div>
            <h4 className="text-base font-black text-white">Brilliant Memory!</h4>
            <p className="text-xs text-slate-300 mt-1 mb-3">
              You cleared all pairs in <span className="font-bold text-amber-400">{moves}</span> moves!
            </p>
            <button
              onClick={restartGame}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-900/50 hover:scale-105 active:scale-95 transition-all"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
