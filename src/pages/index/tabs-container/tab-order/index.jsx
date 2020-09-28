import Taro, { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input, ScrollView } from '@tarojs/components'
// import ShopCart from '@components/shop-cart'
import Category from './category'
import Goods from './goods'
import './index.scss'

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
    let query = Taro.createSelectorQuery()
    if (process.env.TARO_ENV === 'h5') {
      query = query.in(this)
    }else {
      query = query.in(this.$scope)
    }
    setTimeout(() => {
      console.log('tabRectBtm',this.props.tabRectBtm)
      let rectsTemp
      query
        .selectAll('.tabGoods')
        .boundingClientRect(rects => {
          if(rectsTemp)return
          console.log('cateListHeights',rects)
          rectsTemp = rects
          rects.map((rect,index) => {
            this.cateListHeights.push({
              index,
              pos:rect.top
            })
          })
        })
        .exec()
      query
        .select('.shop-cart')
        .boundingClientRect(rect => {
          this.props.boundingClientRect({
            nodeName:'shop-cart',
            rect
          })
        })
        .exec()
    },200)
  }

  onCategoryClick = (e) => {
    if(!this.props.scrollEnabled && e != 0){//内层禁止滑动时就点击了切换类别按钮，此时需要自动置顶
      console.log('onCategoryClick',e)
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
      if(e > this.props.categories.length/2){
        this.setState({cateScrollTop:10000})
      }else {
        this.setState({cateScrollTop:0})
      }
    }
  }

  onScroll(e){
    this.setState({scrollTop:e.detail.scrollTop})
    if(e.detail.scrollTop == 0){
      this.props.onInnerScrollToTop()
    }
    if(this.props.tabsFoods.length > 1){
      //+1过界
      this.tabPosCalc(this.cateListHeights,e.detail.scrollTop + this.props.tabRectBtm + 1)
    }
  }

  onCateScroll(e){
    this.setState({cateScrollTop:e.detail.scrollTop})
  }

  //二分法确定当前选中哪个tab,scrollTop,this.cateListHeights
  tabPosCalc(cateList,y){
    if(cateList.length == 1){
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
    }else if(y >= prevPos){//最后一个位置特殊处理
      this.setState({current:this.cateListHeights.length - 1})
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
            onScroll={this.onScroll.bind(this)}>
            <View className='tabOrder__box-rightSv-inner'>
              {rightListDom}
            </View>
          </ScrollView>
        </View>
        <View className='shop-cart'>
          <View className='shop-cart-icon'></View>
          <Text className='shop-cart-tips'></Text>
          <Text className='shop-cart-price'></Text>
        </View>
      </View>
    )
  }

}

export default Index
