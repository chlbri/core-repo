export const xstate = 'xstate' as const;

export const STATE_VALUES_CRUD = {
  object: {
    idle: 'idle',
    information: 'information',
    success: 'success',
    redirect: 'redirect',
    client: 'client',
    server: 'server',
    permission: 'permission',
    timeout: 'timeout',
  },
  array: [
    'idle',
    'information',
    'success',
    'redirect',
    'client',
    'server',
    'permission',
    'timeout',
  ],
} as const;

export const STATESF_CRUD = {
  object: {
    information: 'information',
    success: 'success',
    redirect: 'redirect',
    client: 'client',
    server: 'server',
    permission: 'permission',
    timeout: 'timeout',
  },
  array: [
    'information',
    'success',
    'redirect',
    'client',
    'server',
    'permission',
    'timeout',
  ],
} as const;

export const ACTIONS_CRUD = {
  object: {
    __increment: '__increment',
    __assignRequest: '__assignRequest',
    __information: '__information',
    __success: '__success',
    __redirect: '__redirect',
    __client: '__client',
    __server: '__server',
    __permission: '__permission',
    __timeout: '__timeout',
  },
  array: [
    '__increment',
    '__assignRequest',
    '__information',
    '__success',
    '__redirect',
    '__client',
    '__server',
    '__permission',
    '__timeout',
  ],
} as const;

export const STATE_CHECKING = 'checking' as const;

export const STATES_FINAL = {
  information: {
    entry: ['__information', '__increment'],
    type: 'final',
  },
  success: {
    entry: ['__success', '__increment'],
    type: 'final',
  },
  redirect: {
    entry: ['__redirect', '__increment'],
    type: 'final',
  },
  client: {
    entry: ['__client', '__increment'],
    type: 'final',
  },
  server: {
    entry: ['__server', '__increment'],
    type: 'final',
  },
  permission: {
    entry: ['__permission', '__increment'],
    type: 'final',
  },
  timeout: {
    entry: ['__timeout', '__increment'],
    type: 'final',
  },
} as const;

export const STATES_COMMON_CRUD = {
  object: {
    checking: 'checking',
    empty_db: 'empty_db',
    empty_ids: 'empty_ids',
    empty_by_filters: 'empty_by_filters',
    options_limit: 'options_limit',
    check_options_limit: 'check_options_limit',
    check_filters_limit: 'check_filters_limit',
    no_options_limit: 'no_options_limit',
    limit_reached: 'limit_reached',
    filters_limit: 'filters_limit',
  },
  array: [
    'checking',
    'empty_db',
    'empty_ids',
    'empty_by_filters',
    'options_limit',
    'check_options_limit',
    'check_filters_limit',
    'no_options_limit',
    'limit_reached',
    'filters_limit',
  ],
} as const;

export const ERRORS_STRING = {
  object: {
    no_machine_states: 'no_machine_states',
    initial_exists: 'initial_exists',
    empty_states: 'empty_states',
    actions_internal: 'actions_internal',
    states_internal: 'states_internal',
    no_checking: 'no_checking',
    context_exits: 'context_exits',
  },
  array: [
    'no_machine_states',
    'initial_exists',
    'empty_states',
    'actions_internal',
    'states_internal',
    'no_checking',
    'context_exits',
  ],
} as const;
