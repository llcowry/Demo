module.exports = {
  printWidth: 120, // 每行的最大长度。超过这个长度的代码会被换行。
  tabWidth: 2, // 一个制表符的空格数。
  useTabs: false, // 使用制表符而不是空格缩进。设置为 true 会使用制表符。
  semi: true, // 在每个语句的末尾添加分号。设置为 true 会添加分号。
  singleQuote: true, // 使用单引号代替双引号。设置为 true 会使用单引号。
  quoteProps: 'as-needed', // 在对象字面量中使用引号包裹属性名。可选值有 "as-needed"、"consistent" 和 "preserve"。
  trailingComma: 'all', // 在多行对象或数组的最后一个元素后加逗号。选项有 none、es5 和 all。
  bracketSpacing: true, // 对象大括号内的空格（如 { foo: bar }）。设置为 true 会在 { 和 } 内使用空格。
  arrowParens: 'always', // 箭头函数参数周围是否要加括号。选项有 avoid 和 always。 eg: (x) => x
  requirePragma: false, // 仅格式化文件顶部包含特定注释（如 @prettier）的文件。设置为 true 仅格式化包含特定注释的文件。
  insertPragma: false, // 文件顶部自动插入 @format 注释。设置为 true 会插入 @format 注释。
  proseWrap: 'preserve', // 是否在 markdown 文件中换行
  endOfLine: 'lf', // 设置换行符。选项有 lf、crlf、cr 和 auto。
  embeddedLanguageFormatting: 'auto', // 控制 Prettier 是否格式化嵌入在其他文件中的代码。可选值有 "auto" 和 "off"。
  htmlWhitespaceSensitivity: 'css', // 控制 HTML 文件的空白敏感度。可选值有 "css"、"strict" 和 "ignore"。
  vueIndentScriptAndStyle: false, // Vue 文件中是否缩进 <script> 和 <style> 标签内的代码。设置为 true 会缩进。
  jsxSingleQuote: true, // 在 JSX 中使用单引号。设置为 true 会在 JSX 中使用单引号。
  jsxBracketSameLine: false, // 在多行 JSX 元素的最后一行末尾添加 >。设置为 false 会在新行添加 >。
  // 可以为特定文件设置特殊的格式化规则。
  overrides: [ 
    {
      files: '*.json',
      options: {
        printWidth: 100,
      },
    },
  ],
};
