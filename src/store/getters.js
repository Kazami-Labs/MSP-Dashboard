const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  language: state => state.app.language,
  size: state => state.app.size,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  errorLogs: state => state.errorLog.logs,
  hasQueues: state => state.app.queues.list.length > 0,
  queuesLength: state => state.app.queues.list.length,
  queues: state => state.app.queues.list
}
export default getters
