## css 变量

CSS变量通常在:root伪类中定义，这样可以确保它们在全局范围内可用。变量名前面有两个连字符（--）。全局css变量定义在<html>元素上（document.documentElement），使之成为全站范围内的默认值。参考`demo01`

- document.documentElement 它返回文档对象 (document) 的根元素。在 HTML 文档中，这个根元素通常是 <html> 元素。
- css 变量定义 `:root{--primary-color: #00b96b;}`
- 读取css 变量 `getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()`
- 修改 css 变量 `document.documentElement.style.setProperty('--primary-color', 'red');`
- CSS 变量（也称为自定义属性）在定义时具有级联性，这意味着它们可以被设置在任何元素上，并影响该元素及其所有的子元素。参考`demo02`
