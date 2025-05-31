import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
import Console from '@/pages/dashboard/Console'
import setting from '@/config/setting'

Vue.use(Router)

// 不需要权限的路由
const routes = [
  {
    path: '/',
    redirect: '/dashboard/console'
  },{
    path: '/dashboard',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'console',
        component: Console,
        meta: {
          title: '控制面板'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login/Login'),
    meta: {
      title: '登录',
      newPage: true
    }
  },{
    path: '/exception',
    component: Home,
    meta: {
      title: '异常页面'
    },
    children: [
      {
        path: '403',
        component: () => import('@/pages/exception/403'),
        meta: {
          title: '403'
        }
      },
      {
        path: '404',
        component: () => import('@/pages/exception/404'),
        meta: {
          title: '404'
        }
      },
      {
        path: '500',
        component: () => import('@/pages/exception/500'),
        meta: {
          title: '500'
        }
      }
    ]
  }
]


// 需要权限的路由
export const allowRouters = [
  {
    path: '/',
    //redirect: '/dashboard/console'
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/pages/login/Login'),
    meta: {
      title: '登陆'
    },
  },
  {
    path: '/service',
    component: () => import('@/pages/service/Service'),
    meta: {
      title: '登陆'
    },
  }
  ,{
    path: '/dashboard',
    component: Home,
    meta: {
      title: '控制面板'
    },
    children: [
      {
        path: 'console',
        component: Console,
        meta: {
          title: '控制面板'
        }
      },
      {
        path: 'syscontroll',
        component: () => import('@/pages/dashboard/syscontroll'),
        meta: {
          title: '系统控制'
        }
      },
    ]
  },

  ,{
    path: '/systemset',
    component: Home,
    meta: {
      title: '系统设置'
    },
    children: [
      {
        path: 'menulist',
        component: () => import('@/pages/systemset/menulist'),
        meta: {
          title: '菜单列表'
        }
      },
      {
        path: 'role',
        component: () => import('@/pages/systemset/role'),
        meta: {
          title: '角色权限管理'
        }
      },
      {
        path: 'controllerlist',
        component: () => import('@/pages/systemset/controllerlist'),
        meta: {
          title: '控制器管理'
        }
      },
      {
        path: 'log',
        component: () => import('@/pages/systemset/Log'),
        meta: {
          title: '操作日志'
        }
      },

    {
      path: 'roleadminlist',
      component: () => import('@/pages/systemset/roleadminlist'),
      meta: {
        title: '角色列表'
      }
    },
      {
        path: 'adminlist',
        component: () => import('@/pages/systemset/adminList'),
        meta: {
          title: '管理员列表'
        }
      },
    ]
  },

  {
    path: '/user',
    component: Home,
    meta: {
      title: '用户管理'
    },
    children: [

      {
        path: 'withdrawal',
        component: () => import('@/pages/user/Withdrawal'),
        meta: {
          title: '提现管理'
        }
      },
      {
        path: 'userlist',
        name: 'userManageList',
        component: () => import('@/pages/user/UserLists'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'useragent',
        name: 'userManageList',
        component: () => import('@/pages/user/UserAgent'),
        meta: {
          title: '代理列表'
        }
      },
      {
        path: 'profit',
        component: () => import('@/pages/user/profit'),
        meta: {
          title: '盈亏列表'
        }
      },
      {
        path: 'usersort',
        component: () => import('@/pages/user/Usersort'),
        meta: {
          title: '收益排行'
        }
       },
        {
          path: 'agentlist',
          name: 'agentlist',
          component: () => import('@/pages/user/Agentlist'),
          meta: {
            title: '代理关系链'
          }
      }
    ]
  },

  {
    path: '/extension',
    component: Home,
    meta: {
      title: '推广管理'
    },
    children:[

      {
        path: 'articletype',
        component: () => import('@/pages/extension/ArticleType'),
        meta: {
          title: '文章分类'
        }
      },
      {
        path: 'articlelist',
        component: () => import('@/pages/extension/ArticleList'),
        meta: {
          title: '文章内容列表'
        }
      },
    ]
  },
{
    path: '/extension',
    component: Home,
    meta: {
      title: '视频管理'
    },
    children:[
      {
        path: 'videotype',
        component: () => import('@/pages/extension/VideoType'),
        meta: {
          title: '视频分类'
        }
      },
      {
        path: 'videolist',
        component: () => import('@/pages/extension/VideoList'),
        meta: {
          title: '视频列表'
        }
      },
      {
        path: 'videovipList',
        component: () => import('@/pages/extension/videovipList'),
        meta: {
          title: '视频套餐列表'
        }
      },
    ]
  },
  {
    path: '/systemmng',
    component: Home,
    meta: {
      title: '系统管理'
    },
    children:[
      {
        path: 'class',
        component: () => import('@/pages/systemmng/Class'),
        meta: {
          title: '分类栏目'
        }
      },
      {
        path: 'domain-name',
        component: () => import('@/pages/systemmng/DomainName'),
        meta: {
          title: '域名管理'
        }
      },

      {
        path: 'template',
        component: () => import('@/pages/systemmng/Template'),
        meta: {
          title: '模板管理'
        }
      },
      {
        path: 'passageway',
        component: () => import('@/pages/systemmng/Passageway'),
        meta: {
          title: '通道管理'
        }
      },
      {
        path: 'configlist',
        component: () => import('@/pages/systemmng/ConfigList'),
        meta: {
          title: '配置列表'
        }
      },
      {
        path: 'ipconfiglist',
        component: () => import('@/pages/systemmng/ipConfigList'),
        meta: {
          title: '白名单列表'
        }
      },
    ]
  },
  {
    path: '/notice',
    component: Home,
    meta: {
      title: '消息管理'
    },
    children:[
      {
        path: 'noticelist',
        component: () => import('@/pages/notice/NoticeList'),
        meta: {
          title: '公告列表'
        }
      },
      {
        path: 'notifylist',
        component: () => import('@/pages/notice/NotifyList'),
        meta: {
          title: '通知列表'
        }
      }
    ]
  },
  {
    path: '/platform',
    component: Home,
    meta: {
      title: '平台管理'
    },
    children:[

      {
        path: 'agent',
        component: () => import('@/pages/platform/Agent'),
        meta: {
          title: '代理管理'
        }
      },
      {
        path: 'moneylog',
        component: () => import('@/pages/log/Moneylog'),
        meta: {
          title: '资金流动'
        }
      },
      {
        path: 'rechargelog',
        component: () => import('@/pages/log/Rechargelog'),
        meta: {
          title: '充值列表'
        }
      },

      {
        path: 'withdrawallog',
        component: () => import('@/pages/log/Withdrawallog'),
        meta: {
          title: '提现列表'
        }
      },
      {
        path: 'records',
        component: () => import('@/pages/log/Records'),
        meta: {
          title: '下注列表'
        }
      },
      {
        path: 'recordsmoney',
        component: () => import('@/pages/log/RecordsMoney'),
        meta: {
          title: '下注资金'
        }
      },
      {
        path: 'userlist',
        name: 'agentUserlist',
        component: () => import('@/pages/user/UserLists'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'useragent',
        component: () => import('@/pages/user/UserAgent'),
        meta: {
          title: '下级代理'
        }
      },
      {
        path: 'userxima',
        component: () => import('@/pages/log/UserXima'),
        meta: {
          title: '洗码列表'
        }
      },
      {
        path: 'userauth',
        component: () => import('@/pages/log/UserAuth'),
        meta: {
          title: '授权列表'
        }
      },
    ]
  },
  {
    path: '/log',
    component: Home,
    meta: {
      title: '日志管理'
    },
    children:[

      {
        path: 'actionlog',
        component: () => import('@/pages/log/Actionlog'),
        meta: {
          title: '操作日志'
        }
      },
      {
        path: 'userxima',
        name: 'loguserxima',
        component: () => import('@/pages/log/UserXima'),
        meta: {
          title: '洗码列表'
        }
      },
      {
        path: 'userauth',
        name: 'loguserauth',
        component: () => import('@/pages/log/UserAuth'),
        meta: {
          title: '授权列表'
        }
      },
      {
        path: 'moneylog',
        name: 'logMoneylog',
        component: () => import('@/pages/log/Moneylog'),
        meta: {
          title: '资金流动日志'
        }
      },
      {
        path: 'withdrawallog',
        name: 'financeWithdrawList',
        component: () => import('@/pages/log/Withdrawallog'),
        meta: {
          title: '提现列表'
        }
      },
      {
        path: 'rechargelog',
        name: 'financeRechargeList',
        component: () => import('@/pages/log/Rechargelog'),
        meta: {
          title: '充值列表'
        }
      },
      {
        path: 'order',
        component: () => import('@/pages/log/order'),
        meta: {
          title: '订单列表'
        }
      },
      {
        path: 'loginlog',
        component: () => import('@/pages/log/Loginlog'),
        meta: {
          title: '登陆日志'
        }
      },
      {
        path: 'records',
        name: 'logRecords',
        component: () => import('@/pages/log/Records'),
        meta: {
          title: '下注列表'
        }
      },
      {
        path: 'recordsmoney',
        name: 'recordsmoney',
        component: () => import('@/pages/log/RecordsMoney'),
        meta: {
          title: '下注资金'
        }
      },
    ]
  },
  {
    path: '/desktop',
    component: Home,
    meta: {
      title: '桌面管理'
    },
    children:[
      {
        path: 'desktoplist',
        component: () => import('@/pages/desktop/Desktoplist'),
        meta: {
          title: '桌面列表'
        }
      },
      {
        path: 'luzhulist',
        component: () => import('@/pages/desktop/Luzhulist'),
        meta: {
          title: '露珠列表'
        }
      },
      {
        path: 'voldlist',
        component: () => import('@/pages/desktop/Voldlist'),
        meta: {
          title: '露珠列表'
        }
      },
      {
        path: 'gamelist',
        component: () => import('@/pages/desktop/Gamelist'),
        meta: {
          title: '游戏列表'
        }
      },
      {
        path: 'oddslist',
        component: () => import('@/pages/desktop/Oddslist'),
        meta: {
          title: '赔率列表'
        }
      },
      {
        path: 'printluzhu',
        component: () => import('@/pages/desktop/Printluzhu'),
        meta: {
          title: '露珠打印'
        }
      }
    ]
  },
]


const router = new Router({
  routes: allowRouters
})

router.beforeEach((to, from, next) => {
  let isLogin = false
  let { meta, matched } = to
  let { title, newPage, keepAlive } = meta
  let sys = JSON.parse(localStorage.getItem("sys"))

  if(sys) {
    isLogin = sys.user.isLogin
  }

  to.params.keepAlive = keepAlive

  // if(!isLogin && to.path !== '/login') {
  //   next('/login')
  //   return
  // }else {
    let { menuList } = store.state.menu

    if(menuList.length > 0) { // 菜单数据加载成功
      if(!matched.length) {   // 打开的页面不存在
        router.push('/exception/404')
        return
      }
    }
    next()
  // }

  // 不是标签页
  if (newPage) {
    return
  }

  // 路由添加到标签页
  store.dispatch('worktab/worktabRoute', {
    to: {
      name: to.name ? to.name : '',
      title: (to.meta && title) ? title : '',
      path: to.path,
      params: to.params
    },
    from: {
      name: from.name ? from.name : '',
      title: (from.meta && from.meta.title) ? from.meta.title : '',
      path: from.path,
      params: to.params
    }
  })

  // 设置网页title
  if(title) {
    // document.title = `${title} - ${setting.systemName}`
    document.title = `${title}`
  }
  return
})

export default router
