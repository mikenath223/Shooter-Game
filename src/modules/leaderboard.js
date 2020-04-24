import 'regenerator-runtime';

export default class LeaderBoard {
  // Game with ID: 9gBpS1srKP6Utyne49W0 added.
  constructor() {

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
    }).then(res => console.log(res.json()));
  }

  async getBoard() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9gBpS1srKP6Utyne49W0/scores/';
    let result = await fetch(this.url, {
      mode: 'cors',
    });
    return await result.json();
  }
}