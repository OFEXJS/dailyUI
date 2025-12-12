> 文本复制组件，兼容生产环境下，HTTP 协议中点击复制文本到剪贴板时出现跨域的问题。

### 入参

| 属性名          | 必填  | 类型          | 描述             |
| --------------- | ----- | ------------- | ---------------- |
| content         | true  | string        | 要复制的文本内容 |
| children        | false | ReactNode     | 自定义复制按钮   |
| styles          | false | CSSProperties | 自定义样式       |
| copySuccessText | false | string        | 复制成功提示文本 |
| copyErrorText   | false | string        | 复制失败提示文本 |

#### 示例

```
<CopyButton content="Hello, World!" />

// or

<CopyButton content="Hello, World!" >
  复制
</CopyButton>

```
