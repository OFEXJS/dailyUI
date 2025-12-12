# dailyUI

自己用的日常开箱即用的 UI 组件库，基于 React 和 Ant Design 构建，提供一系列实用的界面组件，快速构建美观、高效的 Web 应用。

## 📦 安装

使用 npm 安装：

```bash
npm install dailyui
```

使用 yarn 安装：

```bash
yarn add dailyui
```

## 🔨 使用

```jsx
import {
  CopyButton,
  HighlightJSON,
  Breadcrumb,
  FolderList,
  InputNumber,
} from "dailyui";

// 在组件中使用
function MyComponent() {
  return (
    <div>
      <CopyButton content="需要复制的内容">复制</CopyButton>
      <HighlightJSON data={{ name: "dailyUI", version: "1.0.0" }} />
      <Breadcrumb items={["首页", "组件", "使用文档"]} />
    </div>
  );
}
```

## 🧩 组件列表

### CopyButton

复制按钮组件，用于将指定内容复制到剪贴板。

#### 功能特性

- 支持现代 Clipboard API 和传统 execCommand 两种复制方式
- 自定义成功/失败提示消息
- 灵活的样式自定义

#### 示例

```jsx
import { CopyButton } from "dailyui";

<CopyButton
  content="需要复制的文本内容"
  copySuccessText="复制成功！"
  copyErrorText="复制失败，请重试"
  styles={{ marginRight: "10px" }}
>
  点击复制
</CopyButton>;
```

### HighlightJSON

JSON 格式化并高亮显示组件，支持行号显示和复制功能。

#### 功能特性

- 自动格式化 JSON 数据
- 语法高亮显示
- 显示行号
- 支持复制功能
- 支持加载状态

#### 示例

```jsx
import { HighlightJSON } from "dailyui";

<HighlightJSON
  data={{
    name: "dailyUI",
    version: "1.0.0",
    components: ["CopyButton", "HighlightJSON"],
  }}
  title="JSON示例"
  copyEnabled={true}
  loading={false}
/>;
```

### Breadcrumb

面包屑导航组件，显示页面层级关系。

### FolderList

文件夹列表组件，用于展示文件结构。

### InputNumber

数字输入组件，提供数值输入功能。

## 📚 技术栈

- React 18+
- Ant Design 5+
- TypeScript
- Webpack
- Less
