const setting = {
  systemName: '管理系统',
  // 登录默认账号密码
  login: {
    username: 'admin',
    password: '123456'
  },
  // 登录密码加密（用于实现密码复杂度）
  cryptojs: {
    key: "1234123412ABCDEF",
    iv: "ABCDEF1234123412"
  },
  defaultTheme: 'dark', // 默认主题
  themeModel: 'auto',  // 主题模式
  // 菜单主题（选中颜色、hover颜色前往MenuLeft组件修改）
  themeList: [
    {
      theme: 'dark', // 主题名称
      menuLeftBc: '#191A23', // 背景色
      textColor: '#BABBBD', // 文字颜色
      activeColor: '#ffffff', // 文字选中颜色
      iconColor: '#BABBBD', // 图标颜色
      iconColorActive: '#FFFFFF', // 图标选中颜色
      tabbarBackground: '#ffffff',
      tabbarFontColor: '#ffffff'
    },{
      theme: 'white',
      menuLeftBc: '#ffffff',
      textColor: '#515a6e',
      activeColor: '#3296fa',
      iconColor: '#515a6e',
      iconColorActive: '#333333',
      tabbarBackground: '#ffffff',
      tabbarFontColor: '#333333'
    }
  ]
}

export default setting;
