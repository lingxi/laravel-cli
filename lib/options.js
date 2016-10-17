const WEB_PROJECT_DEPENDENCE = [
  {
    'name': 'lingxi/hashids',
    'homepage': 'http://git.lxi.me:81/package/laravel-hashids'
  },
  {
    'name': 'lingxi/options-manager',
    'homepage': 'http://git.lxi.me:81/package/options-manager'
  },
  {
    'name': 'lingxi/browser-detect',
    'homepage': 'http://git.lxi.me:81/package/browser-detect'
  },
  {
    'name': 'lingxi/new-cookie',
    'homepage': 'https://github.com/LingxiTeam/new-cookie'
  },
  {
    'name': 'lingxi/api-authentication',
    'homepage': 'http://git.lxi.me:81/tool/api-authentication'
  },
  {
    'name': 'prettus/l5-repository',
    'homepage': 'https://github.com/andersao/l5-repository'
  }
]
const CUSTOM_PROJECT_DEPENDENCE = []

module.exports = project => {
  if (project === 'web') {
    return WEB_PROJECT_DEPENDENCE
  } else if (project === 'custom') {
    return CUSTOM_PROJECT_DEPENDENCE
  } else {
    return []
  }
}
