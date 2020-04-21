
export default class LeaderBoard {
  constructor() {
    // this.scores = scores
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ name: "StarCraft" }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.json()))
  }
  // Game with ID: 9gBpS1srKP6Utyne49W0 added.

  getBoard() {
    this.score
  }

  saveScore() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9gBpS1srKP6Utyne49W0/scores/';
    this.data = {
      "user": localStorage.getItem('name'),
      "score": localStorage.getItem('score')
    }
    fetch(this.url, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.json()))
  }

  getBoard() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9gBpS1srKP6Utyne49W0/scores/';
    fetch(this.url,{
      mode: 'cors'
    }).then(res => {
      console.log(res.json())
    })
  }
}