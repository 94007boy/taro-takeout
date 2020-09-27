import { PureComponent } from '@tarojs/taro'
import { View, Icon, Text, Input } from '@tarojs/components'
import ShopCart from '@components/shop-cart'
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
    this.state={
      current:0
    }
  }

  onCategoryClick = (e) => {

  }

  render() {
    let leftListDom = this.props.categories.map((category,index) => {
      return(
        <Category
          key={index}
          index={index}
          category={category}
          onClick={this.onCategoryClick}
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
          <View className='tabOrder__box-leftList'>
            {leftListDom}
          </View>
          <View className='tabOrder__box-rightList'>
            <View className='tabOrder__box-rightList-inner'>
              {rightListDom}
            </View>
          </View>
        </View>
        <ShopCart/>
      </View>
    )
  }

}

export default Index
