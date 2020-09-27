import { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input } from '@tarojs/components'
import './index.scss'

class Index extends PureComponent {

  static defaultProps = {}

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View className='evaluate'>
        <Text className='evaluate__tips'>评价</Text>
      </View>
    )
  }

}

export default Index
