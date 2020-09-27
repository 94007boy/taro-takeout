import Taro, { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input, ScrollView } from '@tarojs/components'
import ShopCart from '@components/shop-cart'
import Category from './category'
import Goods from './goods'
import './index.scss'
let query
if (process.env.TARO_ENV === 'h5') {
  query = Taro.createSelectorQuery().in(this)
} else {
  query = Taro.createSelectorQuery().in(this.$scope)
}

class Index extends PureComponent {

  static defaultProps = {
    categories: [
      {name:'会员特价',id:0},
      {name:'躺吃卡',id:1},
      {name:'中秋专区',id:2},
      {name:'下午茶',id:3},
      {name:'解馋宵夜',id:4},
      {name:'轻卡低脂',id:5},
      {name:'儿童零食',id:6},
      {name:'肉食卤味',id:7},
      {name:'麻辣素食',id:8},
      {name:'饼干薯片',id:9},
    ],
    tabsFoods:[
      {category:'会员特价',foods:[{},{},{},{},{}]},
      {category:'躺吃卡',foods:[{},{},{},{},{}]},
      {category:'中秋专区',foods:[{},{},{},{},{}]},
      {category:'下午茶',foods:[{},{},{},{},{}]},
      {category:'解馋宵夜',foods:[{},{},{},{},{}]},
      {category:'轻卡低脂',foods:[{},{},{},{},{}]},
      {category:'儿童零食',foods:[{},{},{},{},{}]},
      {category:'肉食卤味',foods:[{},{},{},{},{}]},
      {category:'麻辣素食',foods:[{},{},{},{},{}]},
      {category:'饼干薯片',foods:[{},{},{},{},{}]}
    ]
  }

  constructor(props) {
    super(props)
    this.cateListHeights = []
    this.state={
      current:0,
      scrollTop:0,
      cateScrollTop:0
    }
  }

  componentDidMount () {
    setTimeout(() => {
      query
        .selectAll('.tabGoods')
        .boundingClientRect(rects => {
          rects.map((rect,index) => {
            this.cateListHeights.push({
              index,
              pos:rect.top
            })
          })
          console.log('scrollOffset',this.cateListHeights)
        })
        .exec()
    },100)
  }

  onCategoryClick = (e) => {
    if(!this.props.scrollEnabled && e != 0){//内层禁止滑动时就点击了切换类别按钮
      this.props.scrollAndSelect(e)//外层自动置顶
      setTimeout(() => {//内层滚动到指定位置
        this.setState({
          scrollTop:this.cateListHeights[e].pos - this.props.tabRectBtm,
          current:e
        })
      },100)
    }else {
      this.setState({
        scrollTop:this.cateListHeights[e].pos - this.props.tabRectBtm,
        current:e
      })
    }
  }

  onScroll(e){
    this.setState({scrollTop:e.detail.scrollTop})
    if(e.detail.scrollTop == 0){
      this.props.onInnerScrollToTop()
    }
    if(this.props.tabsFoods.length > 1){
      this.tabPosCalc(this.cateListHeights,e.detail.scrollTop + this.props.tabRectBtm + 1)
    }
  }

  onCateScroll(e){
    this.setState({cateScrollTop:e.detail.scrollTop})
  }

  onScrollToLower(){
    this.setState({current:this.cateListHeights.length - 1})
  }

  //二分法确定当前选中哪个tab,scrollTop,this.cateListHeights
  tabPosCalc(cateList,y){
    if(cateList.length == 1){
      console.log('cateList',cateList)
      this.setState({current:cateList[0].index})
      return;
    }
    let prevList = cateList.slice(0,cateList.length/2)
    let nextList = cateList.slice(cateList.length/2)
    let prevPos = prevList[prevList.length - 1].pos
    let nextPos = nextList[0].pos
    if(y < prevPos){//落入前半段
      this.tabPosCalc(prevList,y)
    }else if(y > nextPos){//落入后半段
      this.tabPosCalc(nextList,y)
    }else if(y >= prevPos && y < nextPos){//落入中间位置
      if(prevList[prevList.length - 1].index == this.state.current){
        return//已经选中了
      }
      let currentTemp = prevList[prevList.length - 1].index
      this.setState({current:currentTemp})
      if(currentTemp > this.props.categories.length/2){
        this.setState({cateScrollTop:10000})
      }else {
        this.setState({cateScrollTop:0})
      }
    }
  }

  render() {
    let leftListDom = this.props.categories.map((category,index) => {
      return(
        <Category
          key={index}
          index={index}
          category={category}
          onCategoryClick={this.onCategoryClick.bind(this)}
          current={this.state.current} />
      )
    })
    let rightListDom = this.props.tabsFoods.map((tabFoods,index) => {
      let tabFoodsListDom = tabFoods.foods.map((food,index) => {
        return(
          <Goods
            key={index}
            food={food}
          />
        )
      })
      return(
        <View className='tabGoods'>
          <View className='tabGoods__title'>
            <View className='tabGoods__title-icon'/>
            <View className='tabGoods__title-txt'>{tabFoods.category}</View>
          </View>
          {tabFoodsListDom}
        </View>
      )
    })
    return (
      <View className='tabOrder'>
        <View className='tabOrder__box'>
          <ScrollView
            className='tabOrder__box-leftSv'
            scrollTop={this.state.cateScrollTop}
            onScroll={this.onCateScroll.bind(this)}
            scrollY>
            <View className='tabOrder__box-leftSv-inner'>
              {leftListDom}
            </View>
          </ScrollView>
          <ScrollView
            className='tabOrder__box-rightSv'
            scrollY={this.props.scrollEnabled}
            scrollTop={this.state.scrollTop}
            onScrollToLower={this.onScrollToLower.bind(this)}
            onScroll={this.onScroll.bind(this)}>
            <View className='tabOrder__box-rightSv-inner'>
              {rightListDom}
            </View>
          </ScrollView>
        </View>
        <ShopCart/>
      </View>
    )
  }

}

export default Index
