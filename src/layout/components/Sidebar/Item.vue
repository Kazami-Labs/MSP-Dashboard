<script>
import i18n from '@/i18n'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      const titleI18n = i18n.t(`route.${title}`)
      vnodes.push(<span slot='title'>{(titleI18n)}</span>)
    }
    return vnodes
  }
}
</script>
