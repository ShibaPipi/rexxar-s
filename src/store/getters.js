const getters = {
  language: state => state.app.language,
  spanLoading: state => state.app.spanLoading,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction
}

export default getters
