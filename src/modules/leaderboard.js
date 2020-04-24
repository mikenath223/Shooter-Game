import 'regenerator-runtime';

export default class LeaderBoard {
  constructor() {
    this.data = '';
  }

  saveScore() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9gBpS1srKP6Utyne49W0/scores/';
    this.data = {
      user: localStorage.getItem('name'),
      score: localStorage.getItem('score'),
    };
    fetch(this.url, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getBoard() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9gBpS1srKP6Utyne49W0/scores/';
    const result = await fetch(this.url, {
      mode: 'cors',
    });
    await result.json();
  }
}
