import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    // 等同于 configProvider.theme
    theme: {
      components: {
        Button: { contentFontSize: 24 },
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  // locale: {},
  // routes: [
  //   {
  //     name: 'nest',
  //     path: '/nest',
  //     component: './routes/nest',
  //     routes: [
  //       {
  //         name: 'nest-a',
  //         path: '/nest/nest-a',
  //         component: './routes/nest-a',
  //       },
  //       {
  //         name: 'nest-b',
  //         path: '/nest/nest-b',
  //         component: './routes/nest-b',
  //       },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     redirect: '/home',
  //   },

  //   // {
  //   //   name: 'procomponents',
  //   //   path: '/procomponents',
  //   //   routes: [
  //   //     {
  //   //       name: 'protable',
  //   //       path: '/procomponents/protable',
  //   //       routes: [
  //   //         {
  //   //           name: 'Basic Use',
  //   //           path: '/procomponents/protable/basic',
  //   //           component: './procomponents/protable/Demo01BasicUse',
  //   //         },
  //   //         {
  //   //           name: 'Request',
  //   //           path: '/procomponents/protable/request',
  //   //           component: './procomponents/protable/Demo03Request',
  //   //         },
  //   //       ],
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   name: '国际化 示例',
  //   //   path: '/intl',
  //   //   component: './Locale',
  //   // },
  //   // {
  //   //   name: 'jotai Demo1',
  //   //   path: '/jotai/demo1',
  //   //   component: './jotai/Demo1',
  //   // },
  //   // {
  //   //   name: 'jotai Demo2',
  //   //   path: '/jotai/demo2',
  //   //   component: './jotai/Demo2',
  //   // },
  //   // {
  //   //   name: 'Form',
  //   //   path: '/form',
  //   //   routes: [
  //   //     {
  //   //       name: 'DependencyRender',
  //   //       path: '/form/dependencyRender',
  //   //       component: './form/DependencyRender',
  //   //     },
  //   //     {
  //   //       name: 'FormList',
  //   //       path: '/form/formList',
  //   //       component: './form/FormList',
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   name: 'antd',
  //   //   path: '/antd',
  //   //   routes: [
  //   //     {
  //   //       name: 'table',
  //   //       path: '/antd/table',
  //   //       routes: [
  //   //         {
  //   //           name: 'TableStyle',
  //   //           path: '/antd/table/',
  //   //           component: './antd/table/TableStyle',
  //   //         },
  //   //       ],
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   name: '首页',
  //   //   path: '/home',
  //   //   component: './Home',
  //   // },
  //   // {
  //   //   name: '权限演示',
  //   //   path: '/access',
  //   //   component: './Access',
  //   // },
  //   // {
  //   //   name: ' CRUD 示例',
  //   //   path: '/table',
  //   //   component: './Table',
  //   // },
  // ],
  npmClient: 'pnpm',
});
