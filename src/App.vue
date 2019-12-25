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
    />
  </div>
</template>

<script>
import DataForm from './components/data-form/index'

export default {
  name: 'App',
  components: {
    DataForm
  },
  data () {
    return {
      plugin: {},
      labelWidth: '130px',
      form: {
        text: 'hello'
      },
      formOpt: {
        form: {
          text: {
            type: 'text',
            label: '输入框',
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
    }
  }
}
</script>
