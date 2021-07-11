import observe from './observe'
import Compile from './Compile'
class Vue {
    constructor(options) {
      const vm = this;
      vm.$options = options;
      vm._data =
        typeof options.data === "function" ? options.data.call(this) : data;
      observe(this._data);
        
      new Compile(options.template, this._data);
      return vm;
    }
    $mount(el){
        const root = document.querySelector(el)
    }
  }

  export default Vue