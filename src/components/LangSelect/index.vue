<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(langOpt, index) in avaliable"
        :key="index"
        :disabled="isCurrentLanguage(langOpt.lang)"
        :command="langOpt.lang"
      >{{ langOpt.translate }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { avaliable } from '@/i18n'
export default {
  computed: {
    language() {
      return this.$store.getters.language
    },
    avaliable() {
      return avaliable
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: this.$t('common.switchLangSucceeded'),
        type: 'success'
      })
    },
    isCurrentLanguage: function(lang) {
      return this.language === lang
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>

