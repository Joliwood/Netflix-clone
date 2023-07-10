import { addFilm, ADD_FILM } from '../App/action';

describe('addFilm', () => {
  it('should create an action to add a film', () => {
    const film = {
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      year: 1994,
    };

    const expectedAction = {
      type: ADD_FILM,
      payload: film,
    };

    expect(addFilm(film)).toEqual(expectedAction);
  });
});