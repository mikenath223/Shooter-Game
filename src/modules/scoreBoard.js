class User {
  constructor(username) {
    this.username = username;
    localStorage.setItem('name', username);
  }

  getUser() {
    return this.username;
  }
}

class Score {
  constructor() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  increaseScore() {
    this.score += 50;
    localStorage.setItem('score', this.score);
    return this.score;
  }
}

export { User, Score };