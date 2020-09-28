import Taro, { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input } from '@tarojs/components'
import './index.scss'

class Index extends PureComponent {

  static defaultProps = {
    boundingClientRect:{},
    key:1
  }

  constructor() {
    super()
  }

  componentDidMount() {
    console.log('componentDidMount',this)
    let query = Taro.createSelectorQuery()
    if (process.env.TARO_ENV === 'h5') {
      query = query.in(this)
    }else {
      query = query.in(this.$scope)
    }
    query
      .select('.shop-cart')
      .boundingClientRect(rect => {
        // this.props.boundingClientRect({
        //   nodeName:'shop-cart',
        //   rect
        // })
      })
      .exec()
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
