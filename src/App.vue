<template>
  <div id="app">
    <data-form
      v-model="form"
      ref="form"
      :data="formOpt"
      :form-props="{labelWidth: labelWidth}"
      :span="12"
      :plugin="plugin"
      @change="handleChange"
    >
    <div slot="select" style="text-align: right;">
      我是key插入，可用于给某一项表单添加一些装饰性组件，比如导入按钮
    </div>
    <div slot="int-value" style="text-align: right;">
      我是int-value插入，可用于替换掉原来的输入框
    </div>
    </data-form>
    <div style="text-align: center; margin-top: 22px;">
      <el-button type="primary" @click="reset">
        reset
      </el-button>
      <el-button type="primary" plain @click="clearValidate">
        clearvalidate
      </el-button>
    </div>
  </div>
</template>

<script>
import { Button as ElButton } from 'element-ui'
import DataForm from './components/data-form/index'
import PartsInput from './parts-input'

export default {
  name: 'App',
  components: {
    ElButton,
    DataForm
  },
  data () {
    return {
      plugin: {
        ip: PartsInput
      },
      labelWidth: '130px',
      form: {
        text: 'hello'
      },
      formOpt: {
        form: {
          text: {
            type: 'text',
            label: '输入框',
            value: '输入框',
            rules: [
              {
                required: true,
                trigger: 'blur',
                message: '请输入'
              }
            ],
            onChange: (instance, key, val) => {
              console.log(instance, key, val)
            }
          },
          textarea: {
            type: 'textarea',
            label: 'textarea',
            value: '输入框'
          },
          number: {
            type: 'number',
            label: 'number',
            value: '输入框'
          },
          int: {
            type: 'int',
            label: 'int',
            value: '输入框'
          },
          password: {
            type: 'password',
            label: 'password',
            value: '输入框'
          },
          checkbox: {
            type: 'checkbox',
            label: '多选',
            value: [1],
            inputProps: {},
            groupProps: {},
            onChange (instance, key, val) {
              // console.log(instance, key, val)
            },
            options: [
              {
                name: 'option 1',
                value: 1
              },
              {
                name: 'option 2',
                value: 2
              }
            ]
          },
          select: {
            type: 'select',
            label: '下拉选择项',
            value: 2,
            inputProps: {},
            groupProps: {
              size: 'mini'
            },
            onChange (instance, key, val) {
              val === 1 ? instance.destoryItem('ip') : instance.rebuildItem('ip')
            },
            options: [
              {
                name: '我会让输入框消失',
                value: 1
              },
              {
                name: '我会让消失的输入框重建',
                value: 2
              }
            ]
          },
          radio: {
            type: 'radio',
            label: '单选',
            value: 1,
            inputProps: {},
            groupProps: {
              size: 'mini'
            },
            onChange (instance, key, val) {
              val === 1 ? instance.destoryItem('ip') : instance.rebuildItem('ip')
            },
            options: [
              {
                name: '类型1',
                value: 1
              },
              {
                name: '类型2',
                value: 2
              }
            ]
          },
          switch: {
            type: 'switch',
            label: '开关',
            value: false,
            onChange (instance, key, val) {
              val ? instance.destoryItem('ip') : instance.rebuildItem('ip')
            }
          },
          datetimerange: {
            type: 'datetimerange',
            label: '时间段',
            value: '',
            inputProps: {
              rangeSeparator: '到'
            },
            groupProps: {}
          },
          datetime: {
            type: 'datetime',
            label: '时间',
            value: ''
          },
          ip: {
            type: 'ip',
            label: '外部组件',
            value: '192.168.3.444',
            inputProps: {
              size: 3,
              parts: 4,
              split: '.',
              splitWay: true,
              partWidth: 50
            }
          }
        },
        rules: {}
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    handleChange () {
      // console.log(...arguments)
    },
    clearValidate () {
      this.$refs.form.clearValidate()
    }
  }
}
</script>
