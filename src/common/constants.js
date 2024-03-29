export const axiosBaseURL = process.env.EXPO_PUBLIC_AXIOS_BASE_URL;

export const otpSecretKey = 'otp_secret_key';
export const emailRegisterKey = 'email_register';
export const authIdKey = 'auth_id';
export const accessTokenKey = 'access_token';
export const refreshTokenKey = 'refresh_access_token';

export const ScreenName = {
  home: 'home',

  signIn: 'sign-in',
  signUp: 'sign-up',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',
  test: 'test',
  demo: 'demo',
  inquiry: 'inquiry',
  trial: 'trial',
  bottomTab: 'bottom-tab',

  events: 'Sự kiện',
  eventsList: 'eventslist',
  eventDetails: 'event-details',
  addEvent: 'add-event',

  tasks: 'Công việc',
  tasksList: 'taskslist',
  taskDetails: 'task-details',
  addTask: 'add-task',

  notification: 'Thông báo',

  management: 'Quản lý',
  managementMenu: 'management-menu',
  ManagementEmployee: 'Cá nhân',
  managementEmployeeMenu: 'management-employee-menu',

  addEmployee: 'add-employee',

  account: 'account',
  accountDetails: 'account-details',
  editAccount: 'edit-account',
  changePassword: 'change-pasword',

  client: 'client',
  clientList: 'client-list',
  listClientDisabled: 'list-client-disabled',
  clientDetails: 'client-details',
  addClient: 'add-client',
  updateClient: 'update-client',

  employee: 'employee',
  employeeList: 'employee-list',
  employeeDetails: 'employee-details',
  updatRoleEmployee: 'update-role-employee',

  tag: 'tag',
  tagList: 'tag-list',
  addTag: 'add-tag',
};

export const NoticeActionType = {
  create: 'Create',
  update: 'Update',
  delete: 'Delete',
};
