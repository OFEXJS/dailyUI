import { message } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import copyIcon from './copy.svg';

type CopyButtonProps = {
  content: string;
  styles?: CSSProperties;
  children?: ReactNode;
  copySuccessText?: string;
  copyErrorText?: string;
};

export const CopyButton = ({
  content,
  children,
  styles,
  copySuccessText = '复制成功',
  copyErrorText = '复制失败，请手动复制',
}: CopyButtonProps) => {
  // 复制内容到剪贴板
  const copyToClipboard = async () => {
    if (!content) return;

    try {
      // 优先使用现代 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
        message.success(copySuccessText);
        return;
      }

      // 备用方案：使用传统的 execCommand
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        message.success(copySuccessText);
      } else {
        throw new Error('execCommand failed');
      }
    } catch (error) {
      console.error('复制失败:', error);
      message.error(copyErrorText);
    }
  };

  return (
    <>
      {children ? (
        <div onClick={copyToClipboard} style={styles}>
          {children}
        </div>
      ) : (
        <div style={styles}>
          <img
            src={copyIcon}
            style={{ width: 24, cursor: 'pointer' }}
            onClick={copyToClipboard}
          />
        </div>
      )}
    </>
  );
};
