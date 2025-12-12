// 数字输入框组件
import { Input } from "antd";

export const InputNumber = props => {
  const { value, onChange, output = 'Number' } = props
  let _value = value

  let isComposing = false;
  // 改变数值时进行字符串校验
  const _onChange = (e) => {
    const { target, nativeEvent } = e

    // 定制字符串小数
    if (output === 'Decimal') {
      handleDecimal(target.value)
      return;
    }

    if (output === 'NONE') {
      // 数字加字母
      const targetValue = `${target.value}`.replace(/[^a-zA-Z0-9]/g, "");
      if (targetValue) {
        _value = targetValue
      }
      onChange(targetValue ? _value : targetValue)
      return;
    }

    if (output === 'StringNubmer') {
      handleStringNubmer(target.value, nativeEvent.data)
      return;
    }

    handleInputOutput(target.value, nativeEvent.data)
  }
  // 处理小数点返回
  const handleDecimal = (value) => {
    // 正则限制只能输入小数2位，分4步正则过滤
    // 第一步：过滤掉除数字和点意外的字符；
    // 第二步：当0开头，0后面为数字，则过滤掉0，取后面的数字；
    // 第三步：如果输入的第一位为小数点，则替换成 0. 实现自动补全；
    // 第四步：最后限制小数点后面只能输入0到2位小数
    const targetValue = `${value}`.replace(/[^\d^.]+/g, "")
      .replace(/^0+(\d)/, "$1")
      .replace(/^\./, "0.")
      .match(/^\d*(\.?\d{0,2})/g)
    if (targetValue) {
      _value = targetValue
    }
    onChange(targetValue ? _value : targetValue)
  }

  // 处理编号，只能输入字母拼接数字
  const handleStringNubmer = (value, data) => {
    // 判断输入框的内容是否为数字
    if (/^\d+$/.test(data)) isComposing = false
    if (isComposing) {
      onChange(targetValue ? '' : (_value || ''))
      return;
    }
    // 数字
    const regRule = /\D/g;
    const targetValue = `${value}`.replace(regRule, "");
    if (targetValue) {
      _value = targetValue
    }
    onChange(targetValue ? _value : targetValue)
  }

  // 常规处理
  const handleInputOutput = (value, data) => {
    // 判断输入框的内容是否为数字
    if (/^\d+$/.test(data)) isComposing = false
    if (isComposing) return;
    // 正则过滤数字以外的字符
    const targetValue = `${value}`.replace(/\D+/g, '')
    if (targetValue) {
      _value = targetValue
    }
    // 邮箱
    if (output === 'Email') {
      onChange(targetValue ? _value : targetValue)
    }
    // 处理数字，返回的是数字类型的字符串
    if (output === 'Number') {
      let stringNumber = targetValue ? _value : targetValue
      // 如果第一个是0，需要切掉。
      // 不做数字装换，因为太大会显示成科学计数法。
      if (stringNumber[0] === '0') {
        stringNumber = stringNumber.slice(1)
      }
      onChange(stringNumber)
    }
  }

  // 失去焦点时，检查最大最小值
  const onBlur = () => {
    const { min, max } = props
    if (value || value === 0) {
      if (output === 'Decimal') {
        // 如果是小数，以.结束的就过滤掉
        _value = `${value}`.replace(/\.$/, "")
      } else if (max && value > max) {
        // 输入的数字大于最大值，就赋值最大值
        _value = max
      } else if (min && value < min) {
        // 输入的数字小于最小值，就赋值最小值
        _value = min
      }
    }

    // 最小值兼容处理
    if (min && [undefined, null, ''].includes(value)) {
      _value = min
    }

    onChange(_value)
  }
  
  // 当输入拼音时,将标记为改为true,禁止输入框输入
  const handleCompositionStart = (e) => {
    isComposing = true;
  }
  
  // 当安按键为清除时,将标记位放开
  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 8) {
      isComposing = false;
    }
  }

  return <Input
    {...props}
    value={value}
    onChange={_onChange}
    onFocus={() => { }}
    onBlur={onBlur}
    onCompositionStart={handleCompositionStart}
    onKeyDown={handleKeyDown}
  />
}
