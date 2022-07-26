import { riverCross } from '../scripts/RiverCross/river-cross';

describe('river cross challenge', () => {
  test('Case 1:', () => {
    const input = 'L L L L';
    const output = 'R L R L';
    const result = `L L L L\nR L R L`;
    expect(riverCross(input, output)).toMatch(result);
  });

  test('Case 2:', () => {
    const input = 'L L L R';
    const output = 'L L L R';
    const result = `L L L R`;
    expect(riverCross(input, output)).toMatch(result);
  });

  test('Case 3:', () => {
    const input = 'L L L L';
    const output = 'R R R R';
    const result = `L L L L\nR L R L\nL L R L\nR L R R\nL L L R\nR R L R\nL R L R\nR R R R`;
    expect(riverCross(input, output)).toMatch(result);
  });

  test('Case 4:', () => {
    const input = 'R L R L';
    const output = 'L R L R';
    const result = `R L R L\nL L R L\nR L R R\nL L L R\nR R L R\nL R L R`;
    expect(riverCross(input, output)).toMatch(result);
  });

  test('Case 5:', () => {
    const input = 'L L L R';
    const output = 'L L L L';
    const result = `L L L R\nR L R R\nL L R L\nR L R L\nL L L L`;
    expect(riverCross(input, output)).toMatch(result);
  });

  test('Case 6:', () => {
    const input = 'R R R R';
    const output = 'L L R L';
    const result = `R R R R\nL R L R\nR R L R\nL L L R\nR L R R\nL L R L`;
    expect(riverCross(input, output)).toMatch(result);
  });
});
