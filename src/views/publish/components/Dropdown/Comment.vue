<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      {{ $t( `comment.${comment_status}`) }}
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding">
      <el-dropdown-item>
        <el-radio-group v-model="comment_status" style="padding: 10px;">
          <el-radio :label="'open'">{{ $t('comment.open_comment') }}</el-radio>
          <el-radio :label="'closed'">{{ $t('comment.close_comment') }}</el-radio>
        </el-radio-group>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'closed'
    }
  },
  computed: {
    comment_status: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
