// helper for testing action with expected mutations
export const testAction = ({action, done, payload = {}, state = {}, expectedMutations = []}) => {
  let count = 0;

  if (Array.isArray(expectedMutations) === false) {
    expectedMutations = [expectedMutations];
  }

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count];
    expect(mutation.type).toBe(type);

    if (payload) {
      expect(mutation.payload).toEqual(payload);
    }

    count++;

    if (count >= expectedMutations.length) {
      done();
    }
  };

  // call the action with mocked store and arguments
  action({commit, state}, payload);

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).toBe(0);
    done();
  }
};