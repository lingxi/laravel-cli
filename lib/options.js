const logger = require('./logger')

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
    }
];

module.exports = project => {
    if (project === 'web') {
        return WEB_PROJECT_DEPENDENCE;
    } else if (project === 'master') {
        return [];
    } else {
        logger.fatal('其它模式暂时不支持')
    }
}