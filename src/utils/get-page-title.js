import defaultSettings from '@/settings'
import { generateTitle } from './i18n'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    const pageTitleI18n = generateTitle(pageTitle)
    return `${pageTitleI18n} - ${title}`
  }
  return `${title}`
}
