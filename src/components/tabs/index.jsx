import Taro, { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input } from '@tarojs/components'
import './index.scss'

class Tabs extends PureComponent{

  static defaultProps = {
    data:[]
  }

  constructor(props) {
    super(props)
    this.state={
      current:0
    }
  }

  handClick(index){
    this.setState({
      current:index
    })
    this.props.handClick(index)
  }

  componentDidMount() {
    console.log('tabs',this.props)
    let tabsRootRect
    let query = Taro.createSelectorQuery()
    if (process.env.TARO_ENV === 'h5') {
      query = query.in(this)
    }else {
      query = query.in(this.$scope)
    }
    setTimeout(() => {
      query
        .select('.tabsRoot')
        .boundingClientRect(rect => {
          if(tabsRootRect)return
          tabsRootRect = rect
          this.props.boundingClientRect({
            nodeName:'tabsRoot',
            rect
          })
          console.log('tabsRoot',rect.top)
        })
        .exec()
      query
        .select('.tabs_border_box')
        .boundingClientRect(rect => {
          this.props.boundingClientRect({
            nodeName:'tabs_border_box',
            rect
          })
        })
        .exec()
    },100)
  }

  render(){
    return(
      <View className='tabsRoot' id='tabsRoot'>
        <View className='tabs_border_box'>
          {this.props.data.map((value,index)=>
            <View className={`tabs_border ${this.state.current===index?'tabs_border_active':' '}`} key={index} onClick={e => this.handClick(index)}>
              <Text className='tabs_border_tag'>{value.title}</Text>
            </View>
          )}
        </View>
        {/*注意这个api*/}
        <View className='tabs_body'>
          {this.props.children}
        </View>
      </View>
    )
  }

}
export default Tabs;
