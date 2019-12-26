import { DatePicker } from 'element-ui'

export default {
  name: 'WaDatePicker',
  components: {
    DatePicker
  },
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    type: {
      type: [String],
      default: 'datetimerange'
    },
    data: {
      type: [Object],
      default: null
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    value () {
      this.currentValue = this.value
    }
  },
  created () {
    this.currentValue = this.value
  },
  render (h) {
    const self = this
    const inputEvent = (val) => {
      self.$emit('input', val)
    }
    const privateProps = {
      value: this.currentValue
    }
    const commonProps = {
      rangeSeparator: '至',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      disabled: self.data.disabled,
      type: self.type
    }
    const itemProps = self.data.inputProps
    const props = Object.assign({}, commonProps, itemProps, privateProps)
    const listeners = Object.assign({}, this.$listeners, { input: inputEvent })

    return (
      <date-picker
        { ...{ props: props } }
        { ...{ on: listeners } }
      />
    )
  }
}
