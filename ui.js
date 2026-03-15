/**
 * 遊戲 UI：兩個時鐘 — 全暗（點亮出題）／全亮（點暗出題），各自確認後顯示解法
 */

(function () {
  const { N, solveForState } = window.LightGame;

  const CLOCKS = ['dark', 'bright'];

  /** 各時鐘狀態：dark 全暗起、bright 全亮起 */
  const state = {
    dark: new Array(N).fill(0),
    bright: new Array(N).fill(1),
  };

  /** 各時鐘解法與模式 */
  const solution = { dark: null, bright: null };
  const mode = { dark: 'setup', bright: 'setup' };

  const rings = {
    dark: document.getElementById('ring-dark'),
    bright: document.getElementById('ring-bright'),
  };
  const solutionAreas = {
    dark: document.getElementById('solution-dark'),
    bright: document.getElementById('solution-bright'),
  };

  /**
   * 建立單一盞燈的 DOM（編號 1～12，索引 0～11）
   */
  function createLight(index, clockId) {
    const label = index + 1;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'light';
    btn.setAttribute('data-index', index);
    btn.setAttribute('data-clock', clockId);
    btn.setAttribute('aria-label', `第 ${label} 盞燈`);
    btn.style.setProperty('--i', index);
    btn.textContent = label;
    const stepBadge = document.createElement('span');
    stepBadge.className = 'step-badge';
    stepBadge.setAttribute('aria-hidden', 'true');
    btn.appendChild(stepBadge);
    return btn;
  }

  function renderLights(ringEl, clockId) {
    if (!ringEl) return;
    ringEl.innerHTML = '';
    for (let i = 0; i < N; i++) {
      ringEl.appendChild(createLight(i, clockId));
    }
  }

  /**
   * 更新單一時鐘的燈的亮/暗與解法標記
   */
  function updateLights(clockId) {
    const ringEl = rings[clockId];
    const s = state[clockId];
    const sol = solution[clockId];
    if (!ringEl) return;
    ringEl.querySelectorAll('.light').forEach((btn) => {
      const i = parseInt(btn.getAttribute('data-index'), 10);
      const on = s[i] === 1;
      btn.classList.toggle('on', on);
      btn.classList.toggle('off', !on);
      const isInSolution = Array.isArray(sol) && sol.includes(i + 1);
      btn.classList.toggle('in-solution', isInSolution);
      const stepBadge = btn.querySelector('.step-badge');
      if (stepBadge) {
        if (isInSolution) {
          stepBadge.textContent = sol.indexOf(i + 1) + 1;
          stepBadge.hidden = false;
        } else {
          stepBadge.textContent = '';
          stepBadge.hidden = true;
        }
      }
    });
  }

  /**
   * 出題模式：點擊只切換該盞燈
   */
  function onLightClick(clockId, index) {
    if (mode[clockId] !== 'setup') return;
    state[clockId][index] = 1 - state[clockId][index];
    updateLights(clockId);
  }

  /**
   * 確認出題並顯示解法（單一時鐘）
   */
  function confirmPuzzle(clockId) {
    solution[clockId] = solveForState(state[clockId]);
    mode[clockId] = 'solution';
    const area = solutionAreas[clockId];
    const confirmBtn = document.querySelector(`.btn-confirm[data-clock="${clockId}"]`);
    const resetBtn = document.querySelector(`.btn-reset[data-clock="${clockId}"]`);
    if (confirmBtn) confirmBtn.hidden = true;
    if (resetBtn) resetBtn.hidden = false;
    area.hidden = false;
    if (solution[clockId] === null) {
      area.textContent = '此題無 3 步解。';
      area.className = 'solution-area solution-box no-solution';
    } else {
      const sol = solution[clockId];
      area.textContent = `請依序點擊：第 ${sol[0]}、第 ${sol[1]}、第 ${sol[2]} 盞燈。`;
      area.className = 'solution-area solution-box';
    }
    updateLights(clockId);
  }

  /**
   * 重新出題：恢復該時鐘的預設（全暗 / 全亮）
   */
  function resetToSetup(clockId) {
    state[clockId] = clockId === 'dark' ? new Array(N).fill(0) : new Array(N).fill(1);
    solution[clockId] = null;
    mode[clockId] = 'setup';
    const area = solutionAreas[clockId];
    const confirmBtn = document.querySelector(`.btn-confirm[data-clock="${clockId}"]`);
    const resetBtn = document.querySelector(`.btn-reset[data-clock="${clockId}"]`);
    if (area) {
      area.hidden = true;
      area.className = 'solution-area solution-box';
    }
    if (confirmBtn) confirmBtn.hidden = false;
    if (resetBtn) resetBtn.hidden = true;
    updateLights(clockId);
  }

  // 初始化：渲染兩個時鐘
  CLOCKS.forEach((clockId) => {
    renderLights(rings[clockId], clockId);
    updateLights(clockId);
    document.querySelector(`.btn-reset[data-clock="${clockId}"]`).hidden = true;
  });

  // 點擊燈：依 data-clock 與 data-index 更新對應時鐘
  document.querySelectorAll('.ring').forEach((ringEl) => {
    ringEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.light');
      if (!btn) return;
      const clockId = btn.getAttribute('data-clock');
      const index = parseInt(btn.getAttribute('data-index'), 10);
      if (CLOCKS.includes(clockId)) onLightClick(clockId, index);
    });
  });

  // 確認出題
  document.querySelectorAll('.btn-confirm').forEach((btn) => {
    btn.addEventListener('click', () => confirmPuzzle(btn.getAttribute('data-clock')));
  });

  // 重新出題
  document.querySelectorAll('.btn-reset').forEach((btn) => {
    btn.addEventListener('click', () => resetToSetup(btn.getAttribute('data-clock')));
  });
})();
