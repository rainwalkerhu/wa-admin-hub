import WaDataForm from './data-form'

const components = {
  WaDataForm
}

const install = function (Vue) {
  if (install.installed) return
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  ...components
}

module.exports.default = module.exports
