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
      <View className='tabStore'>
        <Text>商家</Text>
      </View>
    );
  }

}

export default Index
