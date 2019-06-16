import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import ElementLocale from 'element-ui/lib/locale'
import elementEn from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZh from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enUs from './en_US'
import zhCn from './zh_CN'

Vue.use(VueI18n)

const messages = {
  'zh-CN': {
    ...zhCn,
    ...elementZh
  },
  'en-US': {
    ...enUs,
    ...elementEn
  }
}

export const avaliable = [
  { lang: 'zh-CN', translate: '简体中文' },
  { lang: 'en-US', translate: 'English' }
]

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  // return 'en-US'
}

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  locale: getLanguage(),
  // set locale messages
  messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
