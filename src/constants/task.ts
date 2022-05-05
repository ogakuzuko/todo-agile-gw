export const TASK_STATUS = [
  'BEFORE_START',
  'STARTED',
  'DEV_FINISHED',
  'VER_DEPLOYED',
  'TEST_OK',
  'TEST_NG',
  'RELEASED',
] as const

export const TASK_TYPE = ['FEATURE', 'CHORE', 'BUG'] as const
