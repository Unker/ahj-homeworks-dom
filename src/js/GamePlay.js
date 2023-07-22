export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  /**
   * Draws boardEl with specific theme
   *
   * @param theme
   */
  drawUi(theme) {
    this.checkBinding();

    this.container.innerHTML = `
      <div id="scores" class="scores">
        <div data-id="dead" class="score"></div>
        <div data-id="lost" class="score"></div>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.dead = this.container.querySelector('[data-id=dead]');
    this.lost = this.container.querySelector('[data-id=lost]');

    this.boardEl = this.container.querySelector('[data-id=board]');

    this.boardEl.classList.add(theme);
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('hole', 'cell');
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  updateCurrentScore(dead, lost) {
    this.dead.textContent = `Убито кротов: ${dead}`;
    this.lost.textContent = `Промахов: ${lost}`;
  }

  activateHole(position) {
    this.boardEl.children[position].classList.add('hole_has-mole');
  }

  /**
   * Draws positions (with mole) on boardEl
   *
   * @param position
   */
  deactivateHole(position) {
    if (position >= 0 && position < this.boardSize ** 2) {
      this.boardEl.children[position].classList.remove('hole_has-mole');
    }
  }

  isActiveHole(position) {
    return this.boardEl.children[position].classList.contains('hole_has-mole');
  }

  /**
   * Add listener to mouse click for cell
   *
   * @param callback
   */
  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(null, index));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
