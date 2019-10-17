import * as b from 'babel-core/register'
import * as b2 from 'babel-polyfill'

import Vue from 'vue/dist/vue.esm.js'

import * as Sentry from '@sentry/browser'
import VueResource from 'vue-resource'
import GlobalOptions from 'vue-global-options'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'

import syncedData from './syncedData'
import '@forevolve/bootstrap-dark/scss/toggle-bootstrap.scss'
import '@forevolve/bootstrap-dark/scss/toggle-bootstrap-dark.scss'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '../css/main.scss'
const $ = window.jQuery = require('jquery')

if (!window.fetch) {
  require('whatwg-fetch')
}

require('sweetalert2')

const api = require('./api').default()
window.swal = require('sweetalert2')
window.Toast = window.swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000
})

/* if (!module.hot) {
  Sentry.init({
    dsn: 'DSN',
    integrations: [new Sentry.Integrations.Vue({ Vue })]
  })
} */

Vue.use(VueResource)
Vue.use(GlobalOptions, ['api', 'config', 'user', 'ui'])
Vue.use(VueI18n)

const messages = require('./locales')

const lang = window.navigator.language.split('-')[0]

const i18n = new VueI18n({
  // check if we have user's langauge code mapped to a locale available, otherwise use en
  locale: messages[lang] ? lang : 'en',
  messages
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: require('./pages/home.vue').default},
    {path: '/settings', component: require('./pages/settings.vue').default},
    {path: '/login', component: require('./pages/login.vue').default},
    {path: '/profile', component: require('./pages/profile.vue').default},
    {path: '/r/:board/:id?', component: require('./pages/posts.vue').default},
    {path: '*', component: require('./pages/404.vue').default}
  ]
})

window.router = router

// click intercept
$(document).on('click', 'a', function (e) {
  const href = $(this).attr('href')
  if (href && href.startsWith('/')) {
    e.preventDefault()
    if (href !== window.app.$route.fullPath) {
      router.push(href)
    }
  }
})

Vue.use(VueRouter)

function voidWarranty (e) {
  $('#state').text(e)
  $('body').addClass('has-error')
}

function state (s) {
  $('#state').text(s)
}

async function onReady () {
  try {
    let res = await window.fetch('/sw')
    res = await res.json()

    if (res !== true) {
      throw new Error('Not sw')
    }

    initApp()
  } catch (err) {
    state('Installing service worker')

    // register the SW
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register('/sw.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration)
        state('Loading app')
        // TODO: verify latest version THEN init
        onReady()
      }, /* catch */ function (error) {
        voidWarranty(error.toString())
      })
    } else {
      voidWarranty('Service workers not supported')
    }
  }
}

async function initApp () {
  // load user info
  let user
  let ui = {}

  function userValueChange () {
    if (ui.dark) {
      $('body').removeClass('bootstrap').addClass('bootstrap-dark')
    } else {
      $('body').removeClass('bootstrap-dark').addClass('bootstrap')
    }
  }

  try {
    user = await api.json('a/info')

    user.config = ui = user.config || {} // sync

    userValueChange()

    // hide spinner
    $('#load').hide()

    // launch app
    window.app = new Vue({
      el: 'app',
      router,
      i18n,
      components: {
        app: require('./app.vue').default
      },

      // globally exposed variables
      api,
      config: {},
      user,
      ui: syncedData(ui, {
        dark: false,
        showNav: false
      }, () => {
        userValueChange()

        api.postJson('a/info/config', user.config).catch(console.error)
      })
    })
  } catch (err) {
    voidWarranty(err.toString())
  }
}

$(document).ready(onReady)
