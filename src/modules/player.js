export default class Score {
  constructor() {
    this.score = 0;
    this.username = '';
  }

  increaseScore() {
    this.score += 100;
    localStorage.setItem(this.username, this.score)
  }

  saveUser() {
    // this.username = ;
  }
}