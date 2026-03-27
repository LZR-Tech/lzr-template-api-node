import { node } from '@lzr/eslint-config'

export default [
  ...node,
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
]
