import {PureComponent} from '@tarojs/taro'
import {View, Icon, Text, Input} from '@tarojs/components'
import CartCtrl from './cart-ctrl'
import './index.scss'

class Index extends PureComponent {

  static defaultProps = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='goods'>
        <View className='goods__img'></View>
        <View className='goods__content'>
          <Text className='goods__content-title'></Text>
          <Text className='goods__content-subtitle'></Text>
          <Text className='goods__content-sold'></Text>
          <View className='goods__content-price'>
            <Text className='goods__content-price-new'></Text>
            <Text className='goods__content-price-old'></Text>
            <View className='goods__content-price-flex'/>
            <CartCtrl/>
          </View>
          <View className='goods__content-coupon'>
            <View className='goods__content-coupon-flag'/>
            <Text className='goods__content-coupon-tips'></Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Index
