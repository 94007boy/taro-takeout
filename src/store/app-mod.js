import Taro from '@tarojs/taro'
import {observable} from 'mobx'
import '@tarojs/async-await'

const appMod = observable({

  systemInfo:Taro.getSystemInfoSync()

})

export default appMod
