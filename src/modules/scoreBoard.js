class User {
  constructor(username) {
    this.username = username;
    this.score = 0
  }

  get playerName() {
    return this.username
  }
}

class Score extends Person {
  constructor() {
    super(username);
    this.score = 0
  }

  get score() {
    return this.score
  }

  set score(points) {
    this.score += points
  }

  getScoreBoard() {
    return {
      username: this.username,
      score: this.score
    }
  }
}

export { User, Score }