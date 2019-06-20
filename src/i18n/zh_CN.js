export default {
  route: {
    dashboard: '首页',
    publishManager: '发布管理',
    createPublish: '创建发布',
    editPublish: '编辑发布',
    publishList: '所有发布',
    settings: '系统设定',
    userManager: '用户管理',
    bangumiAccounts: '同步账户'
  },
  common: {
    cancel: '取消',
    error: '错误',
    ok: '确认',
    create: '新建',
    edit: '编辑',
    status: '状态',
    isEnabled: '启用',
    isDisabled: '禁用',
    enable: '启用',
    disable: '禁用',
    updateDone: '已修改',
    updateFailed: '修改失败，请重试',
    delete: '删除',
    deleteConfirmContent: '即将删除，确认吗？',
    deleteConfirmTitle: '删除提示',
    deleteDone: '已删除',
    isDeveloping: '此功能正在开发中……',
    inputTips: '请输入内容',
    success: '成功',
    switchLangSucceeded: '语言切换完成',
    requestWrong: '请求出错！',
    loginFailed: '登录失败，请检查输入的用户名和密码是否正确',
    sessionTimeoutTips: '会话已过期。请重新登录',
    actionDone: '操作已完成',
    actionFailed: '操作失败',
    queueProcess: '同步任务处理中...',
    queueCompile: '无同步发布任务',
    pending: '等待中...',
    processing: '处理中...',
    failed: '失败',
    finished: '已完成',
    pleaseSelect: '请选择',
    yes: '是',
    no: '否'
  },
  table: {
    search: '搜索',
    add: '添加',
    export: '导出',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确定',
    sort: '排序',
    refresh: '刷新',
    createdAt: '创建时间'
  },
  auth: {
    hasBeenLogout: '登录超时，你可以关闭此对话框以留在当前页面，或者点击重登按钮重新登录',
    confirmLogout: '你已登出',
    reLoginBtn: '重新登录',
    logoutSuccessed: '你已登出'
  },
  site: {
    title: 'Mabors! Publish Platform 「Beta」'
  },
  loginView: {
    username: '电邮地址',
    password: '密码',
    invaildEmailTips: '请输入正确的电邮地址',
    invaildPasswordTips: '请输入密码',
    loginBtn: 'LINK START!',
    connecting: 'CONNECTING...',
    loading: 'LOADING...'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  errorLogView: {
    title: '错误日志',
    detail: '详细信息',
    msg: '消息:',
    info: '信息:',
    url: '路由:',
    in: '位于',
    stack: '调用栈'
  },
  navbar: {
    logout: '登出',
    home: '首页',
    queueProcess: '当前还有同步任务在执行……',
    queueCompile: '没有在执行的同步任务'
  },
  dashboard: {
    queues: '同步队列',
    postTitle: '番剧',
    siteName: '发布站点',
    status: '状态'
  },
  publish: {
    id: '发布id',
    date: '创建时间',
    author: '发布者',
    status: '发布状态',
    title: '标题',
    guid: '固定链接',
    edit: '编辑',
    showBangumiSyncLog: '日志',
    publish: '发布',
    editPublish: '编辑发布',
    published: '已发布',
    draft: '草稿',
    delete: '删除',
    deleted: '已删除',
    inherit: 'Inherit',
    idAsc: 'ID升序',
    idDesc: 'ID降序',
    createdAtAsc: '较旧的发布排在前面',
    createdAtDesc: '较新的发布排在前面',
    excerpt: '摘要',
    words: '字',
    publishDone: '发布完成',
    draftDone: '草稿已保存',
    searchUser: '搜索用户',
    createdAt: '发布时间',
    updatedAt: '最后修改时间',
    torrentUploadTips: '请在此上传种子文件，将会根据种子名自动填充标题与组名。',
    publishSucceed: '《{0}》已发布',
    publishFailed: '发布失败。{0}'
  },
  users: {
    id: 'id',
    name: '用户名',
    avatar: '头像',
    password: '密码',
    isAdmin: '管理员',
    setAsAdmin: '设为管理员',
    nicename: '昵称',
    email: '电子邮件',
    registered: '注册时间',
    status: '状态',
    edit: '编辑'
  },
  comment: {
    open: '评论已打开',
    closed: '评论已关闭',
    close_comment: '关闭评论',
    open_comment: '打开评论'
  },
  bangumi: {
    year: '播出年份',
    subtGroup: '字幕组',
    platform: '网站平台',
    syncState: '发布结果',
    logFile: '响应日志',
    showLogContents: '详细'
  },
  bangumiSettings: {
    id: 'ID',
    platform: '平台',
    authinfo: '账户信息',
    username: '账户',
    password: '密码',
    noChangeWithNonValue: '为空表示不修改密码',
    status: '启用状态'
  },
  torrentUpload: {
    selectFile: '选择文件',
    submitUpload: '开始上传'
  }
}
