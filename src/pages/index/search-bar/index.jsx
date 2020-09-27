import { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input } from '@tarojs/components'
import './index.scss'
import { observer, inject } from '@tarojs/mobx'

@inject('appMod')
@observer
class Index extends PureComponent {

  static defaultProps = {

  }

  constructor(props) {
    super(props)
  }

  componentDidMount () {

  }

  render () {
    const { appMod:{systemInfo}  } = this.props
    const top = systemInfo.statusBarHeight + 30 + 'px'
    return (
      <View className='searchBar' style={{paddingTop:top,backgroundColor: this.props.bgColor}}>
        <View className='searchBar__leftIcon'/>
        <View className='searchBar__input'>
          <Icon size='15' type='search' color='#aaa' />
          <Input className='searchBar__input-input' type='text' placeholder='搜索店内商品' placeholderStyle='color:#aaa'/>
        </View>
        <View className='searchBar__rightIcon'/>
      </View>
    )
  }

}

export default Index
