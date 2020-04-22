class User {
  constructor(username) {
    this.username = username;
    localStorage.setItem('name', username);
  }
}

class Score {
  constructor() {
    this.score = 0;
  }

  increaseScore() {
    this.score += 50;
    localStorage.setItem('score', this.score);
    return this.score;
  }
}

export { User, Score };