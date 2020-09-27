import {PureComponent} from '@tarojs/taro'
import {View, Icon, Text, Input} from '@tarojs/components'
import './index.scss'

class Index extends PureComponent {

  static defaultProps = {

  }

  constructor(props) {
    super(props)
  }

  onCategoryClick = (e) => {
    this.props.onCategoryClick(this.props.index)
  }

  render() {
    return (
      <View className={`category ${this.props.current===this.props.index?'active':''}`}
            onClick={this.onCategoryClick}>
        <Text className='category__txt'>{this.props.category.name}</Text>
      </View>
    );
  }

}
export default Index
