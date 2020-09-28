import {PureComponent} from '@tarojs/taro'
import {View, Icon, Text, Input} from '@tarojs/components'
import './index.scss'
import Tabs from '@components/tabs'
import TabOrder from './tab-order'
import TabStore from './tab-store'
import TabEvaluate from './tab-evaluate'

class Index extends PureComponent {

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state={
      current:0,
      scrollEable:false
    }
  }

  handClick(current){
    console.log('handClick',this,this.state)
    this.setState({current:current})
  }

  setScrollEnable(scrollEable){
    this.setState({scrollEable})
  }

  onInnerScrollToTop(){
    this.props.onInnerScrollToTop()
  }

  scrollAndSelect(index){
    this.props.scrollAndSelect(index)
  }

  render(){
    const data=[
      {
        title:'点单'
      },
      {
        title:'评价',
        num:17
      },
      {
        title:'商家'
      }
    ]
    const wrapStyle = {
      marginBottom:this.props.btmPadding,
      height:this.state.scrollEable?this.props.subTabHeight+'px':'',
      display:`${0===Number(this.state.current)?'block ':'none'}`}

    return(
      <Tabs
        data={data}
        handClick={this.handClick.bind(this)}
        boundingClientRect={this.props.boundingClientRect}>
        <View style={wrapStyle}>
          <TabOrder
            key={1}
            tabRectBtm={this.props.tabRectBtm}
            scrollEnabled={this.props.scrollEnabled}
            scrollAndSelect={this.scrollAndSelect.bind(this)}
            boundingClientRect={this.props.boundingClientRect}
            onInnerScrollToTop={this.onInnerScrollToTop.bind(this)}/>
        </View>
        <View style={wrapStyle}>
          <TabEvaluate key={0}/>
        </View>
        <View style={wrapStyle}>
          <TabStore key={2}/>
        </View>
      </Tabs>
    )
  }
}

export default Index
