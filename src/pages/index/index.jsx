import Taro, { Component } from '@tarojs/taro'
import { View,ScrollView } from '@tarojs/components'
import SearchBar from './search-bar'
import StoreHeader from './store-header'
import TabsContainer from './tabs-container'
import './index.scss'
import { observer, inject } from '@tarojs/mobx'
let query
if (process.env.TARO_ENV === 'h5') {
  query = Taro.createSelectorQuery().in(this)
} else {
  query = Taro.createSelectorQuery().in(this.$scope)
}
//购物车的高度
let shopCartHeight

@inject('appMod')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    this.state={
      tabRectBtm:0,//悬浮后，tab栏距离顶部的距离
      scrollTop:0,
      subTabHeight:0,
      scrollFlag:true,//最外层是否允许滑动
      outerMaxScroll:0
    }
  }

  componentDidMount () {
    const { appMod:{systemInfo}  } = this.props
    const { windowHeight, statusBarHeight, titleBarHeight } = systemInfo
    //获取TabsContainer距离窗口顶部的距离offsetTop a
    let tabsContainerTop;
    //获取SearchBar底部距离窗口顶部的距离
    let searchBarBottom
    //最外层视图可以滚动的最大距离
    let outerMaxScroll
    //子Tab内的滚动区域可用高度
    let subTabHeight
    //头部的高度
    let storeHeader

    //tab条的高度
    let tabHeight
    setTimeout(() => {
      //获取TabsContainer距离窗口顶部的距离offsetTop a
      query
        .select('.tabsRoot')
        .boundingClientRect(rect => {
          tabsContainerTop = rect.top
          console.log('tabsContainerTop',tabsContainerTop)
        })
        .exec()
      query
        .select('.searchBar')
        .boundingClientRect(rect => {
          searchBarBottom = rect.bottom
          console.log('searchBarBottom',searchBarBottom)
        })
        .exec()
      query
        .select('.shop-cart')
        .boundingClientRect(rect => {
          shopCartHeight = rect.height
          console.log('shopCartHeight',shopCartHeight)
        })
        .exec()
      // storeHeader
      query
        .select('.storeHeader')
        .boundingClientRect(rect => {
          storeHeader = rect.height
        })
        .exec()
      query
        .select('.tabs_border_box')
        .boundingClientRect(rect => {
          tabHeight = rect.height
          console.log('tabHeight',tabHeight)
        })
        .exec()
    },100)
    setTimeout(() => {
      outerMaxScroll = tabsContainerTop - searchBarBottom
      console.log('outerMaxScroll',outerMaxScroll)
      subTabHeight = windowHeight - searchBarBottom - tabHeight
      console.log('subTabHeight',subTabHeight)
      this.setState({outerMaxScroll,subTabHeight,tabRectBtm:storeHeader + tabHeight})
    },250)



    //右侧列表滚动监听：如果滚到了最顶部，则最外层此时再次允许滚动
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //内部已经滚回顶部，外层可以滑动了
  onInnerScrollToTop(){
    this.setState({scrollFlag:true})
  }

  scrollAndSelect(index){
    console.log('scrollAndSelect',index)
    this.setState({scrollTop:this.state.outerMaxScroll,sbBgColor:'#F4F4F4',scrollFlag:false})
    this.tabsRef.setScrollEnable(true)
  }

  onScroll(e){
    //最外层滚动监听：如果最外层视图滚动过的距离 > d,则最外层需要位置fix，禁止再滚动
    if(e.detail.scrollTop == 0){
      this.tabsRef.setScrollEnable(false)
      this.setState({sbBgColor:'',scrollTop:e.detail.scrollTop,scrollFlag:true})
    }else if(e.detail.scrollTop >= this.state.outerMaxScroll){
      this.setState({scrollTop:this.state.outerMaxScroll,sbBgColor:'#F4F4F4',scrollFlag:false})
      this.tabsRef.setScrollEnable(true)
    }else if(this.state.scrollFlag){
      this.setState({
        sbBgColor:'',
        scrollTop:e.detail.scrollTop})
    }
  }

  render () {
    return (
      <View className='scrollBox'>
        <SearchBar
          bgColor={this.state.sbBgColor}/>
        <ScrollView
          style={{overflowY: !this.state.scrollFlag?'hidden':'scroll'}}
          scrollTop={this.state.scrollTop}
          scrollY
          onScroll={this.onScroll.bind(this)}>
          <View className='scrollBox__inner'>
            <StoreHeader/>
            <TabsContainer
              tabRectBtm={this.state.tabRectBtm}
              scrollAndSelect={this.scrollAndSelect.bind(this)}
              onInnerScrollToTop={this.onInnerScrollToTop.bind(this)}
              scrollEnabled={!this.state.scrollFlag}
              ref={(node) => this.tabsRef = node}
              btmPadding={shopCartHeight}
              subTabHeight={this.state.subTabHeight}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Index
