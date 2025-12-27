import { Button, Empty, message, Spin } from "antd";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/github.css";
import { CSSProperties, useEffect, useRef } from "react";
import "./index.less";

// 注册 JSON 语言
hljs.registerLanguage("json", json);

type HighlightJSONProps = {
  title?: string;
  copyEnabled?: boolean;
  data: any;
  loading?: boolean;
  styles?: CSSProperties;
};

const HighlightJSON = ({
  data,
  title,
  copyEnabled,
  loading = false,
  styles = {},
}: HighlightJSONProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && data) {
      // 格式化 JSON
      const formattedJSON = JSON.stringify(data, null, 2);

      // 先设置纯文本，让 highlight.js 处理
      codeRef.current.textContent = formattedJSON;

      // 高亮代码
      if (codeRef.current.dataset.highlighted) {
        delete codeRef.current.dataset.highlighted;
      }
      hljs.highlightElement(codeRef.current);

      // 高亮完成后，添加行包裹和行号支持
      const highlightedHTML = codeRef.current.innerHTML;

      // 将高亮后的 HTML 每行包裹 <span class="line">
      const lines = highlightedHTML.split("\n");
      const wrappedLines = lines
        .map((line) => `<span class="line">${line}</span>`) // 空行不添加占位符
        .join("\n");

      codeRef.current.innerHTML = wrappedLines;
    }
  }, [data]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      message.success("复制成功");
    } catch (err) {
      message.error(`复制失败：${err}`);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e1e4e8",
        borderRadius: "6px",
        overflow: "hidden",
        height: "100%",
        ...styles,
      }}
    >
      <Spin spinning={loading}>
        {data ? (
          <>
            {/* 头部 */}
            {(title || copyEnabled) && (
              <div
                style={{
                  background: "#f6f8fa",
                  padding: "8px 16px",
                  borderBottom: "1px solid #e1e4e8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                <div>
                  {title && <span style={{ color: "#586069" }}>{title}</span>}
                </div>
                {copyEnabled && (
                  <Button onClick={copyToClipboard} type="primary" size="small">
                    复制
                  </Button>
                )}
              </div>
            )}

            {/* 内容区域 - 单一 pre，行号由 CSS counter 实现 */}
            <div style={{ background: "white" }}>
              <pre
                style={{
                  margin: 0,
                  padding: "1em 16px 12px 70px", // 左侧留 70px 给行号
                  overflowY: "auto",
                  lineHeight: "0", // 与 .line 类的行高保持一致
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  counterReset: "line 0", // 在 pre 上重置
                  position: "relative",
                }}
              >
                <code
                  ref={codeRef}
                  className="language-json hljs"
                  style={{
                    padding: 0,
                    background: "#fff",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    display: "block",
                  }}
                />
              </pre>
            </div>
          </>
        ) : (
          <div style={{ paddingTop: 100 }}>
            <Empty description={false} />
          </div>
        )}
      </Spin>
    </div>
  );
};

export default HighlightJSON;
