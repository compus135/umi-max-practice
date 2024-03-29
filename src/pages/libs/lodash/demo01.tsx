import { Button } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

const Demo = () => {
  const [count, setCount] = useState('');

  return (
    <div>
      <Button onClick={() => setCount(_.uniqueId())}>{count}</Button>
    </div>
  );
};

export default Demo;
