import { Checkbox, Col, ConfigProvider, Flex, Radio, Row, Switch } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval>>();
  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setChecked((prev) => !prev);
    }, 500);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const nodes = (
    <Flex gap="small">
      <Checkbox checked={checked}>Checkbox</Checkbox>
      <Radio checked={checked}>Radio</Radio>
      <Switch checked={checked} />
    </Flex>
  );

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>{nodes}</Col>
      <Col span={24}>
        <ConfigProvider theme={{ token: { motion: false } }}>
          {nodes}
        </ConfigProvider>
      </Col>
    </Row>
  );
};

export default App;
