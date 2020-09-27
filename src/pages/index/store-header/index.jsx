import {PureComponent} from '@tarojs/taro'
import {View, Icon, Text, Input} from '@tarojs/components'
import './index.scss'

class Index extends PureComponent {

  static defaultProps = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='storeHeader'>
        <View className='storeHeader__bg'/>
        <View className='storeHeader__info'>
          <View className='storeHeader__info-avatar'/>
          <View className='storeHeader__info-content'>
            <View className='storeHeader__info-content-title'>
              <Text className='storeHeader__info-content-title-name'></Text>
              <View className='storeHeader__info-content-title-icon'/>
              <Text className='storeHeader__info-content-title-distance'></Text>
            </View>
            <View className='storeHeader__info-content-subtitle'>
              <View className='storeHeader__info-content-subtitle-icon'/>
              <Text className='storeHeader__info-content-subtitle-name'></Text>
            </View>
            <Text className='storeHeader__info-content-tips'></Text>
          </View>
          <View className='storeHeader__info-line'/>
          <View className='storeHeader__info-switch'>
            <View className='storeHeader__info-switch-icon'/>
            <Text className='storeHeader__info-switch-action'></Text>
          </View>
        </View>
        <View className='storeHeader__activity'>
          <View className='storeHeader__activity-flag'/>
          <View className='storeHeader__activity-tips'/>
        </View>
      </View>
    )
  }

}

export default Index
