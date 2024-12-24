const eslintConfig = [
  // Подключаем базовые Next/TS конфиги
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Добавляем свой объект конфигурации, в котором прописываем/переопределяем правила
  {
    rules: {
      // Например, отключим правило о запрете any
      "@typescript-eslint/no-explicit-any": "off",

      // Или отключим правило о запрете ts-comment
      "@typescript-eslint/ban-ts-comment": "off",

      // Или любое другое правило
      // "no-console": "warn",
      // "eqeqeq": "error",
    },
  },
];

export default eslintConfig;
