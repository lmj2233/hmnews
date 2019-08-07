<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择" @click="showChoseFile" />
        <input style="display:none" type="file" ref="input" @change="changeFile" >
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { uploadUserPhoto } from '@/api/user.js'
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
    // 1.点击相册，选择图片
    showChoseFile () {
      // 打开磁盘 JS原生 通过操作DOM
      this.$refs['input'].click()
    },
    //  2. 预览图片
    changeFile () {
      // 获取当前选中的文件，把选择好的文件转换为base64
    // 原生JS转换为base64
      const reader = new FileReader()
      //   传递了一个文件，转换为base64
      // readAsDataURL(获取选择的文件) files[0]
      reader.readAsDataURL(this.$refs['input'].files[0])
      //  onload事件=> 图片加载完成 触发
      console.log(reader)
      reader.onload = () => {
        console.log(reader.result)
        //  存储base64图片存储到父组件 触发父组件的upload-photo组件的setBase64Success方法
        this.$emit('setBase64Success', reader.result)
        // 获取base64图片
        // 预览图片组件
        ImagePreview({
          images: [reader.result],
          showIndex: false, // 是否显示页码
          onClose: () => {
            // 打开确认对话框
            this.openDia()
          }
        })
      }
    },
    // 3.对话框确认是否上传头像
    openDia () {
      this.$dialog.confirm({
        message: '确认要选择该图片吗？'
      }).then(async () => {
        // on confirm
        // 已经有图片，发送请求
        // console.log('---')
        const data = await uploadUserPhoto(
          'photo',
          this.$refs['input'].files[0]
        )
        console.log(data)
        // 关闭头像对话框,触发子组件的显示关闭对话框的值
        if (data.photo) {
          //   关闭对话框，传值给父组件user-profile
          this.$emit('input', false)
          //   更新选择好的图片,将图片地址传递给父组件，父组件进行发送请求提交数据
          this.$emit('upload-success', data.photo)
        }
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style>
</style>
