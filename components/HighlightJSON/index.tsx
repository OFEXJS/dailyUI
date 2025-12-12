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

export const HighlightJSON = ({
  data,
  title,
  copyEnabled,
  loading = false,
  styles = {},
}: HighlightJSONProps) => {
  const codeRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const generateLineNumbers = (jsonString: string) => {
    if (lineNumbersRef.current) {
      const lines = jsonString.split("\n");
      lineNumbersRef.current.innerHTML = lines
        .map((_, index) => `<div class="line-number">${index + 1}</div>`)
        .join("");
    }
  };

  useEffect(() => {
    if (codeRef.current && data) {
      // 格式化 JSON
      const formattedJSON = JSON.stringify(data, null, 2);
      codeRef.current.textContent = formattedJSON;

      // 清除之前可能存在的高亮标记，避免重复高亮报错
      if (codeRef.current?.dataset && codeRef.current?.dataset.highlighted) {
        delete codeRef.current.dataset.highlighted;
      }

      // 高亮代码
      hljs.highlightElement(codeRef.current);

      // 生成行号
      generateLineNumbers(formattedJSON);
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
                  <Button
                    onClick={copyToClipboard}
                    color="green"
                    variant="solid"
                  >
                    复制
                  </Button>
                )}
              </div>
            )}

            {/* 内容区域 */}
            <div style={{ display: "flex", background: "white" }}>
              {/* 行号 */}
              <div
                ref={lineNumbersRef}
                style={{
                  padding: "1em 8px 12px 16px",
                  textAlign: "right",
                  background: "#f6f8fa",
                  color: "#2F8099",
                  userSelect: "none",
                  borderRight: "1px solid #e1e4e8",
                  minWidth: "40px",
                  lineHeight: "1.5",
                  fontSize: "14px",
                }}
              />

              {/* 代码 */}
              <pre
                style={{
                  margin: 0,
                  flex: 1,
                  overflowX: "auto",
                  lineHeight: "1.5",
                  fontSize: "14px",
                }}
              >
                <code
                  ref={codeRef}
                  className="language-json"
                  style={{ background: "#fff" }}
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
