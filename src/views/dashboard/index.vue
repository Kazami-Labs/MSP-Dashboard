<template>
  <div class="dashboard-container">
    <panel-group />
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as compoments from './compoments'

export default {
  name: 'Dashboard',
  components: compoments,
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    min-height: calc(100vh - 84px);
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
