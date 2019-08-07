<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择" @click="showChoseFile" />
        <input style="display:none" type="file" ref="input" >
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },

  computed: {

  },

  methods: {
    //
    showChoseFile () {
      // 打开磁盘 JS原生
      this.$refs['input'].click()
    }
  }
}
</script>

<style>
</style>
