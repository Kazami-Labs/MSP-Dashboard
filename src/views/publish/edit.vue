<template>
  <publish-detail :is-edit="true" />
</template>

<script>
import PublishDetail from './components/PublishDetail'

export default {
  name: 'EditForm',
  components: { PublishDetail }
}
</script>

