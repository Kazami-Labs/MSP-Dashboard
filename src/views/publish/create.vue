<template>
  <publish-detail :is-edit="false" />
</template>

<script>
import PublishDetail from './components/PublishDetail'

export default {
  name: 'CreateForm',
  components: { PublishDetail }
}
</script>

