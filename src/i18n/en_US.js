export default {
  route: {
    dashboard: 'Dashboard',
    publishManager: 'Publication',
    createPublish: 'Create',
    editPublish: 'Edit',
    publishList: 'Publication List',
    settings: 'Settings',
    userManager: 'Users',
    bangumiAccounts: 'Banugmi Accounts'
  },
  common: {
    cancel: 'Cancel',
    error: 'Error',
    ok: 'Ok',
    create: 'Add',
    edit: 'Edit',
    status: 'Status',
    isEnabled: 'Enabled',
    isDisabled: 'Disabled',
    enable: 'Enable',
    disable: 'Disable',
    updateDone: 'Modified successed',
    updateFailed: 'The modification failed, please try again',
    delete: 'Delete',
    deleteConfirmContent: 'Will it be deleted, it is ok?',
    deleteConfirmTitle: 'Confirm',
    deleteDone: 'Deleted successed',
    isDeveloping: 'This function is developing...',
    inputTips: 'Input here',
    success: 'Success',
    switchLangSucceeded: 'Switch language succeeded',
    requestWrong: 'Request has something wrong!',
    loginFailed: 'Auth failed, please check the username and password!',
    sessionTimeoutTips: 'Session is timeout.Please try login again.',
    actionDone: 'Done.',
    actionFailed: 'Failed.',
    queueProcess: 'Queues are processing...',
    queueCompile: 'All queues compiled!',
    pending: 'Pending...',
    processing: 'Processing...',
    failed: 'Failed',
    finished: 'Finished',
    pleaseSelect: 'Please Select',
    yes: 'Yes',
    no: 'No'
  },
  table: {
    search: 'Search',
    add: 'Add',
    export: 'Export',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    sort: 'Sort',
    refresh: 'Refresh',
    createdAt: 'Created at'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  auth: {
    hasBeenLogout: 'You have been logged out, you can cancel to stay on this page, or log in again',
    confirmLogout: 'Confirm logout',
    reLoginBtn: 'Re-Login',
    logoutSuccessed: 'Successfully logged out'
  },
  site: {
    title: 'Mabors! Publish Platform 「Beta」'
  },
  loginView: {
    username: 'Username',
    password: 'Password',
    invaildEmailTips: 'Please enter the correct email',
    invaildPasswordTips: 'Please enter the correct password',
    loginBtn: 'LINK START!',
    connecting: 'CONNECTING...',
    loading: 'LOADING...'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  navbar: {
    logout: 'Logout',
    home: 'Dashboard',
    queueProcess: 'Queues are processing...',
    queueCompile: 'All queues compiled!'
  },
  dashboard: {
    queues: 'Queues',
    postTitle: 'Post',
    siteName: 'Site',
    status: 'State'
  },
  publish: {
    id: 'Id',
    date: 'Created At',
    author: 'Author',
    status: 'Status',
    title: 'Title',
    guid: 'Permalink',
    edit: 'Edit',
    showBangumiSyncLog: 'Sync log',
    publish: 'Publish',
    editPublish: 'Edit',
    published: 'Published',
    draft: 'Draft',
    delete: 'Delete',
    deleted: 'Deleted',
    inherit: 'Inherit',
    idAsc: 'ID Ascending',
    idDesc: 'ID Descending',
    createdAtAsc: 'Created At Ascending',
    createdAtDesc: 'Created At Descending',
    excerpt: 'Descriptions',
    words: 'Words',
    publishDone: 'Publish successed',
    draftDone: 'Draft saved',
    searchUser: 'Search User',
    createdAt: 'Publish at',
    updatedAt: 'Updated at',
    torrentUploadTips: 'Please upload the seed file here, and the title and group name will be automatically populated based on the seed name. ',
    publishSucceed: '{0} has published.',
    publishFailed: 'It doesn\'t published. {0}'
  },
  users: {
    id: 'Id',
    name: 'Account',
    avatar: 'Avatar',
    password: 'Password',
    isAdmin: 'Administrator',
    setAsAdmin: 'Set as Admin',
    nicename: 'Name',
    email: 'E-mail',
    registered: 'Registered At',
    status: 'Status',
    edit: 'Edit'
  },
  comment: {
    open: 'Comment is open',
    closed: 'Comment is closed',
    close_comment: 'Close',
    open_comment: 'Open'
  },
  bangumi: {
    year: 'Original run', // 来自Wiki百科的翻译
    subtGroup: 'Subtitle Group',
    platform: 'Platform',
    syncState: 'Publish result',
    logFile: 'Log file',
    showLogContents: 'Show detail'
  },
  bangumiSettings: {
    id: 'ID',
    platform: 'Platform',
    authinfo: 'Account Info',
    username: 'Username',
    password: 'Password',
    noChangeWithNonValue: 'Blank means no password change',
    status: 'Status'
  },
  torrentUpload: {
    selectFile: 'Choose file',
    submitUpload: 'Upload'
  }
}
