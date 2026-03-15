/**
 * 燈光翻轉遊戲 — 環形 12 盞燈，3 步解法
 * 狀態：0 = 暗，1 = 亮
 * 點擊索引 i 會翻轉 (i-1)%12, i, (i+1)%12
 */

const N = 12;

/**
 * 建構環形操作向量：點擊索引 i 時翻轉 (i-1)%12, i, (i+1)%12
 * @returns {number[][]} 12 個長度 12 的 0/1 陣列
 */
function buildMoveVectors() {
  const moves = [];
  for (let i = 0; i < N; i++) {
    const v = new Array(N).fill(0);
    v[(i - 1 + N) % N] = 1;
    v[i] = 1;
    v[(i + 1) % N] = 1;
    moves.push(v);
  }
  return moves;
}

const MOVE_VECTORS = buildMoveVectors();

/**
 * 兩向量 XOR（GF(2) 加法）
 */
function xorVec(a, b) {
  return a.map((x, i) => x ^ b[i]);
}

/**
 * 針對給定初始狀態，求「從該狀態到全亮」的 3 步解。
 * 目標翻轉向量 = 初始為 0 的位要翻成 1，故 targetFlip[i] = 1 - initialState[i]（或 1 若為 0、0 若為 1）
 * @param {number[]} initialState 長度 12 的 0/1 陣列
 * @returns {number[]|null} 長度 3 的燈編號 1～12，無解則 null
 */
function solveForState(initialState) {
  const targetFlip = initialState.map((x) => (x === 0 ? 1 : 0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        const effect = xorVec(xorVec(MOVE_VECTORS[i], MOVE_VECTORS[j]), MOVE_VECTORS[k]);
        if (effect.every((x, idx) => x === targetFlip[idx])) {
          return [i + 1, j + 1, k + 1];
        }
      }
    }
  }
  return null;
}

/**
 * 對狀態 state 點擊索引 index（0～11），回傳新狀態（不改動原陣列）
 */
function applyMove(state, index) {
  const next = state.slice();
  const left = (index - 1 + N) % N;
  const right = (index + 1) % N;
  next[left] = 1 - next[left];
  next[index] = 1 - next[index];
  next[right] = 1 - next[right];
  return next;
}

/**
 * 檢查是否全亮
 */
function isAllOn(state) {
  return state.every((x) => x === 1);
}

// 供網頁使用
window.LightGame = {
  N,
  applyMove,
  isAllOn,
  solveForState,
};
