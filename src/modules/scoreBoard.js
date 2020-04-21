class User {
  constructor(username) {
    this.username = username;
    localStorage.setItem('name', username);
  }

  get playerName() {
    return this.username
  }
}

class Score {
  constructor() {
    this.score = 0;
  }

  get score() {
    return this.score;
  }

  set score(points) {
    this.score += points
    localStorage.setItem('score', this.score);
  }

  getScoreBoard() {
    return {
      username: localStorage.getItem('name'),
      score: this.score
    }
  }
}

export { User, Score }