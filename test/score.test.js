import { Score, User } from '../src/modules/scoreBoard';

describe('checks scores on score class object', () => {
  const user = new User('mike');
  const score = new Score()

  test('it checks the right user name input', () => {
    expect(user.getUser()).toEqual('mike');
  })

  test('it checks that score is accurate', () => {
    expect(score.getScore()).toEqual(0);
  })

  test('it increases the score of user', () => {
    score.increaseScore();
    expect(score.getScore()).toEqual(50);
  })
})