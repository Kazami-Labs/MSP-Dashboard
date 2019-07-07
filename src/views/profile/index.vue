<template>
  <div class="components-container">
    <pan-thumb :image="image" />

    <el-button
      type="primary"
      icon="upload"
      style="position: absolute;bottom: 15px;margin-left: 40px;"
      @click="imagecropperShow=true"
    >{{ $t('profile.changeAvatar') }}</el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      :url="changeAvatar"
      :lang-type="language"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { changeAvatar } from '@/api/user'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'Profile',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      changeAvatar
    }
  },
  computed: {
    ...mapGetters(['language', 'avatar'])
  },
  mounted() {
    this.image = this.avatar
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.avatar + '#' + (new Date()).getTime()
      this.$store.dispatch('user/setAvatar', this.image)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>

