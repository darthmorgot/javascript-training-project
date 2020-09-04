import {CreateStore} from './createStore';

describe('test', () => {
  test('test', () => {
    const store = new CreateStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
