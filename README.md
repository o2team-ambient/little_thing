## 使用方法

```
jnpm i @o2team/ambient-little_thing --save
```

```javascript
import ATLittleThing from '@o2team/ambient-little_thing'

ATLittleThing({
  loop: true,
  style: 'cyan',
  size: 'big',
  color: [212, 54, 54]
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| loop | `boolean` | `true`, `false` | 是否循环 |
| style | `string` | `['red', 'yellow', 'cyan', 'blue', 'purple']` | 【图形】red: 圆形移动墨迹；yellow: 左侧烟雾；cyan: 大爆炸；blue: 泼墨；purple: 右侧烟雾 |
| size | `string` | `['big', 'middle', 'small']` | 动效尺寸 |
| color | `array` | RGB 值 | 图形颜色 |

## 预览地址

https://o2team-ambient.github.io/little_thing/dist/?controller=1

## 项目结构

```
├── config                  - 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json               - 挂件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.html
    ├── index.js            - 主入口文件
    ├── config.js           - 控制板参数配置文件（单独打包）
    ├── control.js          - 控制板入口文件（单独打包）
    └── js
        ├── ambient.js
        ├── controlinit.js  - 控制板自定义代码
        └── utils
            ├── const.js
            ├── raf.js
            └── util.js
```
