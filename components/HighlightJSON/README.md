> 基于 highlight.js 的代码高亮组件，自定义了行数样式

### 入参

| 属性名      | 必填  | 类型      | 描述             |
| ----------- | ----- | --------- | ---------------- |
| data        | true  | JSON 数据 | 展示的数据       |
| title       | false | string    | 标题            |
| copyEnabled | false | boolean   | 是否显示复制按钮 |
| loading     | false | boolean   | 数据加载动画     |
| styles      | false | boolean   | 自定义样式     |

#### 示例

```
<HighlightJSON
  data={{
    api_response: {
      success: true,
      message: '数据获取成功',
      data: {
        metadata: {
          total: 2, // 总数
          page: 1,
          limit: 10,
        },
      },
    },
  }}
  title="example.json"
  copyEnabled={true},
/>

```

