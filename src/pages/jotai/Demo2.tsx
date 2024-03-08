/* eslint-disable react/button-has-type */

import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
console.log(countAtom);

function Child() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <p> Child Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
    </div>
  );
}

function Demo2() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      <Child />
    </div>
  );
}

export default Demo2;
