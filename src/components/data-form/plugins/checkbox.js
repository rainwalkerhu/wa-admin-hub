import { Checkbox, CheckboxGroup } from 'element-ui'

export default {
  components: {
    Checkbox,
    CheckboxGroup
  },
  name: 'WaCheckbox',
  props: {
    value: {
      type: [Array],
      default: function () { return [] }
    },
    data: {
      type: [Object],
      default: function () { return {} }
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  computed: {
    options () {
      return this.data.options || []
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
      disabled: this.data.disabled
    }
    const groupProps = this.data.groupProps
    const props = Object.assign({}, commonProps, groupProps, privateProps)
    const listeners = Object.assign({}, this.$listeners, { input: inputEvent })
    return (
      <checkbox-group { ...{ props: props } } { ...{ on: listeners } }>
        {
          self._l(self.options, (option, i) => {
            const privateProps = { label: option.value, key: i }
            const commonProps = self.data.inputProps
            const itemProps = option
            const props = Object.assign({}, commonProps, itemProps, privateProps)
            return (
              <checkbox { ...{ props: props } }>
                { option.name }
              </checkbox>
            )
          })
        }
      </checkbox-group>
    )
  }
}
