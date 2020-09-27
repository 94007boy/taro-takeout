import { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input } from '@tarojs/components'
import './index.scss'

class Index extends PureComponent {

  constructor() {
    super()
  }

  render() {
    return (
      <View className='shop-cart'>
        <View className='shop-cart-icon'></View>
        <Text className='shop-cart-tips'></Text>
        <Text className='shop-cart-price'></Text>
      </View>
    )
  }

}

export default Index;
