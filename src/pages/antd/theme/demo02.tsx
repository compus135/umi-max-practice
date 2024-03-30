import { Button, ConfigProvider, Input, Space, theme } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      // 1. 单独使用暗色算法
      algorithm: theme.darkAlgorithm,

      // 2. 组合使用暗色算法与紧凑算法
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <Space>
      <Input placeholder="Please Input" />
      <Button type="primary">Submit</Button>
    </Space>
  </ConfigProvider>
);

export default App;
