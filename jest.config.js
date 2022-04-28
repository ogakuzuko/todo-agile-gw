// 基本的には公式参照（https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler）
// コメント部分はZenn記事を参照（https://zenn.dev/miruoon_892/articles/e42e64fbb55137）
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // next.config.jsとテスト環境用の.envファイルが配置されたディレクトリをセット。基本は"./"で良い。
  dir: './',
})

// Jestのカスタム設定を設置する場所。従来のプロパティはここで定義。
const customJestConfig = {
  // jest.setup.jsを作成する場合のみ定義（各テストを実行する前に、さらに設定オプションを追加する必要がある場合）
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    // aliasを定義（tsconfig.jsonのcompilerOptions>pathsの定義に合わせる）
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfigを定義することによって、本ファイルで定義された設定がNext.jsの設定に反映される
module.exports = createJestConfig(customJestConfig)
