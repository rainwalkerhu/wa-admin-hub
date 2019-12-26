import {
  Form as ElForm,
  FormItem as ElFormItem,
  Col as ElCol,
  Row as ElRow,
  Input as ElInput
} from 'element-ui'
import plugins from './plugins'
import './style/index.styl'

export default {
  name: 'DataForm',
  components: {
    ElForm,
    ElFormItem,
    ElCol,
    ElRow,
    ElInput
  },
  props: {
    data: {
      type: [Object],
      default: null
    },
    plugin: {
      type: [Object],
      default: null
    },
    value: {
      type: [Object],
      default: null
    },
    formProps: {
      type: [Object]
    },
    span: {
      type: [Number],
      default: 24
    }
  },
  data () {
    return {
      form: {},
      rules: {},
      formMap: {},
      dataForm: [],
      plugins: plugins
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.dataForm = this.initDataForm()
      }
    },
    form () {
      this.$emit('input', this.form)
    },
    value (val) {
      this.form = val
    }
  },
  created () {
    this.form = Object.assign({}, this.initModel(this.data), this.value)
    this.dataForm = this.initDataForm()
    this.plugins = Object.assign(this.plugins, this.plugin)
  },
  methods: {
    sliceArray (array, size) {
      let _result = []
      let visibleArr = array.filter((item, index) => {
        return this.formMap[item.key] !== false
      })
      for (let i = 0; i < Math.ceil(visibleArr.length / size); i++) {
        const start = i * size
        const end = start + size
        _result.push(visibleArr.slice(start, end))
      }
      return _result
    },
    initDataForm () {
      let data = []
      Object.keys(this.data.form).forEach((key) => {
        let form = Object.assign({}, this.data.form[key], { key: key })
        data.push(form)
        let rules = this.data.rules && this.data.rules[key]
        this.rules[key] = form.rules || rules
      })
      data.sort((a, b) => {
        return a.index - b.index
      })
      return data
    },
    initModel (n) {
      let form = {}
      Object.keys(n.form).forEach((key) => {
        this.$set(this.formMap, key, true)
        form[key] = n.form[key].value
      })
      this.$emit('input', form)
      return form
    },
    reset () {
      this.form = this.initModel(this.data)
      this.clearValidate()
    },
    clearValidate () {
      this.$refs['dataForm'].clearValidate()
    },
    getValidator () {
      return this.$refs['dataForm']
    },
    destoryItem (arr = [], rebuild = false) {
      const _this = this
      arr = arr instanceof Array ? arr : [arr]
      arr.forEach((key) => {
        _this.formMap[key] = rebuild
      })
    },
    rebuildItem (arr = []) {
      this.destoryItem(arr, true)
    },
    handleChange (key, val, item) {
      item['onChange'] && item['onChange'](this, key, val)
      this.$emit('change', key, val, item)
    },
    renderPlugin (item) {
      const ItemPlugin = this.plugins[item.type]
      const inputEvent = function (val) {
        this.form[item.key] = val
      }.bind(this)
      const changeEvent = function () {
        this.handleChange(item.key, this.form[item.key], item)
      }.bind(this)
      const privateProps = {
        value: this.form[item.key]
      }
      const commonProps = {
        trigger: item.trigger || 'blur',
        placeholder: item.placeholder,
        disabled: item.disabled,
        type: item.type,
        data: item
      }
      const itemProps = item.inputProps
      const props = Object.assign({}, commonProps, itemProps, privateProps)
      const listeners = Object.assign({}, this.$listeners, { input: inputEvent, change: changeEvent })

      return (
        this.$slots[`${item.key}-value`]
          ? this.$slots[`${item.key}-value`]
          : <ItemPlugin
            { ...{ props: props } }
            { ...{ on: listeners } }
          />
      )
    },
    renderRow (group) {
      return this._l(group, (item, index) => {
        return (
          this.formMap[item.key] !== false
            ? <el-col key={index} span={this.span}>
              {this.$slots[item.key]}
              {
                <el-form-item label={item.label} ref={item.key} prop={item.key}
                  { ...{ props: item.formItemProps } }>
                  { this.renderPlugin(item) }
                </el-form-item>
              }
            </el-col>
            : null
        )
      })
    },
    renderFormItem (groups) {
      return this._l(groups, (group, index) => {
        return (
          <el-row gutter={16}>
            { this.renderRow(group) }
          </el-row>
        )
      })
    }
  },
  render (h) {
    const formInputEvent = function (val) {
      this.form = val
    }.bind(this)
    const data = {
      props: Object.assign({}, this.formProps, {
        model: this.form,
        rules: this.rules
      }),
      ref: 'dataForm',
      attrs: this.$attrs,
      on: Object.assign({}, this.$listeners, { input: formInputEvent })
    }
    const groups = this.sliceArray(this.dataForm, 24 / this.span)
    return (
      <el-form { ...data }>
        { this.renderFormItem(groups) }
      </el-form>
    )
  }
}
