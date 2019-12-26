import checkbox from './checkbox'
import DatePicker from './date-picker'
import InputNumber from './input-number'
import input from './input'
import Radio from './radio'
import Select from './select'
import Switch from './switch'

const PLUGINS = {
  checkbox: checkbox,
  datetime: DatePicker,
  datetimerange: DatePicker,
  int: InputNumber,
  text: input,
  textarea: input,
  number: input,
  password: input,
  radio: Radio,
  select: Select,
  switch: Switch
}

export default PLUGINS
