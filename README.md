# vue-tiny-autocomplete

## 特性

- 主题可基于 scss 变量定制
- 单元测试
- 基于 BEM 样式风格

## 文档

### Prop

#### value

`type: String`
输入框的值

#### fetchSuggestions

`type: ()=>Array<Object>`
获得匹配项的方法

获得建议项方法

#### valueKey

`type: String`
使用匹配项中的哪一个值展示

#### filterMethod

`type: (item: Object, keywords)=>Boolean`
筛选匹配项的方法

#### 其它

支持所有其它`input`标签可用的属性

### 事件

#### input

`type: String`
输入的值

### Slot

#### default

`type: (item: Object)`
下拉面板中的匹配项

## TODO

- 自动化构建
- 添加动画
- 可自动更新的文档

## 开始项目

```bash
npm install
npm serve
```

### 运行测试用例

```bash
npm test:unit
```

### 自动格式化文件

```bash
npm lint
```
