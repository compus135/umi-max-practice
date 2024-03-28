import { Button } from 'antd';
import { createContext, useContext, useState } from 'react';
const context = createContext<any>({});
const Grandson = () => {
  console.log('Grandson');
  const { color, setColor } = useContext(context);
  console.log(color);
  return (
    <div>
      Grandson
      <Button onClick={() => setColor('yellow')}>change yellow</Button>
    </div>
  );
};

const Son = () => {
  console.log('Son');
  return (
    <div>
      <Grandson />
    </div>
  );
};

const Other = () => {
  console.log('Other');
  return <div>Other</div>;
};

const Comp = () => {
  console.log('Comp');
  const [color, setColor] = useState('red');
  return (
    <context.Provider value={{ color, setColor }}>
      <Son />
      <Other />
    </context.Provider>
  );
};

export default Comp;
