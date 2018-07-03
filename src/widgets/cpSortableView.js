import React from 'react';
import {
    View,
    Animated,
    LayoutAnimation,
    TouchableWithoutFeedback,
    TouchableOpacity,
    PanResponder
} from 'react-native';

import PropTypes from 'prop-types';

const AnimationDuration = 192; //動畫執行時長

export default class SortableView extends React.Component {

    static propTypes = {
        onDragStart: PropTypes.func, 
        onDragRelease: PropTypes.func
    }

    static defaultProps = {
        onDragStart: () => { }, //開始拖拽
        onDragRelease: ({ oldIndex, newIndex }) => { } //結束拖拽
    }

    //拖拽的位置
    _shadowLayout = {
        position: 'absolute',
        left: new Animated.Value(0),
        top: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0)
    };

    //實現拖拽內容高亮
    _shadowStyle = {
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { height: 0, width: 2 },
        elevation: 5
    }

    _sortableItemLayout = {}; //需要排序的Layout集合
    _grantItem = undefined; //允許拖拽的內容

    constructor(props) {
        super(props);
        this.state = {
            children: this._cloneChildren(props),
            shadowChild: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.length != this.props.children.length) {
            _sortableItemLayout = {};
            _grantItem = undefined;
    
            this.setState({
                children: this._cloneChildren(nextProps),
                shadowChild: undefined
            });
        } else {
            _sortableItemLayout = {};
            _grantItem = undefined;
            this.setState({
                children: this._cloneChildren(nextProps),
            }); 
        }
    }

    render() {
        return (
            <Animated.View {...this.props}>
                {[...this.state.children]}
                {!this.state.shadowChild ? undefined : React.cloneElement(this.state.shadowChild, {
                    style: [this.state.shadowChild.props.style, this._shadowLayout, this._shadowStyle]
                })}
            </Animated.View>
        );
    }

    _cloneChildren(props) {
        const children = Array.isArray(props.children) ? props.children : props.children ? [props.children] : [];
        let filterChildren = [];
        //1.過濾無效的child, null之類的
        //2.過濾不需要排序的child
        children.map((child, index) => {
            if (React.isValidElement(child) && child.props.dragEnable === true) {
                filterChildren.push(
                    React.cloneElement(child, {
                        _index: index,
                        _onSortableItemLayout: this._onSortableItemLayout,
                        _onDragStart: this._onDragStart,
                        _dragStartAnimation: this.props.dragStartAnimation, //向子組件仁慈拖拽時的動畫 
                        _onDragRelease: this._onDragRelease,
                        _onGrantSortableItem: this._onGrantSortableItem,
                        _onGrantItemMove: this._onGrantItemMove,
                        _onGrantItemRelease: this._onGrantItemRelease,
                        _onGrantItemTerminate: this._onGrantItemTerminate,
                    })
                )
            } else if (React.isValidElement(child) && child.props.dragEnable === false) {
                filterChildren.push(
                    React.cloneElement(child)
                )
            }
        });
        return filterChildren;
    }

    _onSortableItemLayout = (item, { nativeEvent: { target, layout } }) => {
        this._sortableItemLayout[item.props._index] = layout; //渲染時綁定內容位置
    }

    _onDragStart = () => {
        this.props.onDragStart && this.props.onDragStart(); //向子組件傳遞開始拖拽事件
    }

    _onDragRelease = (oldIndex, newIndex) => {
        this.props.onDragRelease && this.props.onDragRelease({ oldIndex, newIndex }); //向子組件傳遞結束拖拽事件
    }

    //克隆 item 对应的 child, 用于跟随 touch 移动
    _onGrantSortableItem = (item, { nativeEvent: { pageX, pageY } }) => {
        this._grantItem = item;
        const shadowChild = this.state.children.filter(child => child.props._index === item.props._index).pop();

        if (shadowChild) {
            const originalLayout = this._sortableItemLayout[item.props._index];
            this._shadowLayout.left.setValue(originalLayout.x);
            this._shadowLayout.top.setValue(originalLayout.y);
            this._shadowLayout.width.setValue(originalLayout.width);
            this._shadowLayout.height.setValue(originalLayout.height);

            this.setState({
                shadowChild: React.cloneElement(shadowChild, {
                    key: 'SHADOW_CHILD',
                    _index: -1,
                    pointerEvents: 'none'
                }),
                shadowLocation: {
                    left: originalLayout.x,
                    top: originalLayout.y,
                    width: originalLayout.width,
                    height: originalLayout.height,
                    pageX, pageY
                }
            })
        }
    }

    // 计算 shadowItem 当前的位置大小
    _getShadowItemLayout(originalItem, { nativeEvent: { pageX, pageY } }) {
        const layout = this._sortableItemLayout[originalItem.props._index];
        const location = this.state.shadowLocation;
        if (!location) { //作非空判斷，防止state更新不及時
            return undefined;
        } else {
            // step 1. 计算出当前位置与初始位置的相对位置
            const offsetX = pageX - location.pageX;
            const offsetY = pageY - location.pageY;

            // step 2. 计算出新的 left/top
            const left = location.left + offsetX;
            const top = location.top + offsetY;
            const { width, height } = location;

            return { left, top, width, height };
        }
    }

    //跟隨手勢移動
    _onGrantItemMove = (item, evt) => {
        const location = this._getShadowItemLayout(item, evt);
        if (location) {
            const { left, top, width, height } = location;
            this._shadowLayout.left.setValue(left);
            this._shadowLayout.top.setValue(top);
            this._shadowLayout.width.setValue(width);
            this._shadowLayout.height.setValue(height);
        }
    }

    _onGrantItemTerminate = (item, evt) => {
        this.setState({
            children: this.state.children,
            shadowChild: undefined
        });
    }

    /**
     *	
     */
    _onGrantItemRelease = (item, evt) => {
        // 如果 onDragRelease 回调不存在，则不会重新排序
        const location = this._getShadowItemLayout(item, evt);
        if (!location) {
            this.setState({
                children: this.state.children,
                shadowChild: undefined
            });
            return;
        }
        const { left, top, width, height } = location;
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // step 1. 新建 children 数组
        // step 2. 移除 item 对应的 child 
        // step 3. 找到 shadowItem 当前位置对应的 child -> as locatedChild
        // step 4. 插入到 locatedChild 前面

        // 获取 oldIndex, newIndex;
        var oldIndex, newIndex;

        this.state.children.forEach((child, index) => {
            if (child.props._index === item.props._index) {
                oldIndex = index; //得到oldIndex
            }
        });

        const enableDragChildren = []; //允許拖拽的集合，也就是dragEable=true
        const disableDragChildren = []; //禁止拖拽的集合，也就是dragEable=true
        const grantedChild = this.state.children.filter((child, index) => {
            if (child.props._index === item.props._index) {
                return true;
            } else {
                if (child.props.dragEnable) {
                    enableDragChildren.push(child);
                } else {
                    disableDragChildren.push({child, index});
                }
                return false;
            }
        }).pop();

        if (!grantedChild) return;

        var isLocated = false;
        const sortedChildren = enableDragChildren.reduce((children, child, index) => {
            const layout = this._sortableItemLayout[child.props._index];

            // 如果 centerX centerY 落在 layout 内，则将 grantedChild 插入到 child 前面 
            if (!isLocated && layout
                && centerX >= layout.x && centerX <= layout.x + layout.width
                && centerY >= layout.y && centerY <= layout.y + layout.height) {
                isLocated = true;
                return children.concat(index < oldIndex ? [grantedChild, child] : [child, grantedChild]);
            }

            return children.concat([child]);

        }, []);

        //將禁止拖拽內容插入原來的位置，保持不變
        disableDragChildren.map((item, index) => {
            sortedChildren.splice(item.index, 0, item.child);
        });

        sortedChildren.forEach((child, index) => {
            if (child.props._index === item.props._index) {
                newIndex = index; //得到newIndex
            }
        });

        // 在没有找到新位置与老位置时，不更新界面
        const shouldUpdate = isLocated && newIndex !== undefined && oldIndex !== undefined;

        !this.props.onDragRelease && console.warn('Sortable 需要属情 onDragRelease 才会执行排序');

        // 设置排序到，更新到新位置的动画
        LayoutAnimation.configureNext(LayoutAnimation.create(
            AnimationDuration,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.opacity
        ));

        // 释放 shadowChild
        this.setState({
            children: shouldUpdate ? sortedChildren : this.state.children,
            shadowChild: undefined
        }, () => {
            // 位置变化的事件回调，需要延迟到动画结束后进行
            if (shouldUpdate) {
                this.timer = setTimeout(() => {
                    this.props.onDragRelease && this.props.onDragRelease({ oldIndex, newIndex })
                }, AnimationDuration)
            }
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer); //清除計時器
    }
}

class Item extends React.Component {

    static propTypes = {
        dragEnable: PropTypes.bool,
        onTap: PropTypes.func,
        style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        activeOpacity: PropTypes.number
    }

    static defaultProps = {
        dragEnable: true, //是否拖拽，默認true
        onTap: () => { }, //點擊事件
        style: {}
    }

    ACTIVE_OPACITY = 0.7 //默認透明度

    keepLongPress = false; //是否長按 

    constructor(props) {
        super(props);
        this.state = {
            startDragWiggle: new Animated.Value(0) 
        }
    }

    componentWillMount() { 
        //創建PanResponder，處理手勢
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._touchableHandleShouldSetResponder,
            onStartShouldSetResponderCapture: this._touchableHandleShouldSetResponder,
            onMoveShouldSetPanResponder: this._touchableHandleShouldSetResponder,
            onStartShouldSetResponderCapture: this._touchableHandleShouldSetResponder,
            onPanResponderGrant: this._touchableHandleResponderGrant,
            onPanResponderMove: this._touchableHandleResponderMove,
            onPanResponderTerminationRequest: this._touchableHandleResponderTerminationRequest,
            onPanResponderRelease: this._touchableHandleResponderRelease,
            onPanResponderTerminate: this._touchableHandleResponderTerminate
        });
    }

    _touchableHandleShouldSetResponder = ({ nativeEvent }, gestureState) => {
        return this.keepLongPress; //是否長按
    }

    _touchableHandleResponderTerminationRequest = ({ nativeEvent }) => {
        return false;
    }

    _touchableHandleResponderGrant = (event, gestureState) => {
        this.props._onGrantSortableItem(this, event);
        this.props.onResponderGrant && this.props.onResponderGrant(event);
    }

    _touchableHandleResponderMove = (event, gestureState) => {
        this.props._onGrantItemMove(this, event);
        this.props.onResponderMove && this.props.onResponderMove(event)
    }

    _touchableHandleResponderRelease = (event, gestureState) => {
        this.props._onGrantItemRelease(this, event);
        this.props.onResponderRelease && this.props.onResponderRelease(event)
        this.isLongPress = false;
    }

    _touchableHandleResponderTerminate = ({ nativeEvent }) => {
        this.props._onGrantItemTerminate(this, event);
        this.isLongPress = false;
    }

    render() {
        const { dragEnable } = this.props;
        if (dragEnable) {
            return (
                <Animated.View
                    style={[this.props.style, this.dragStartAnimation()]}
                    onLayout={this._onLayout}
                    {...this._panResponder.panHandlers}>
                    <TouchableWithoutFeedback
                        delayLongPress={300}
                        onPress={() => {
                            this.props.onTap && this.props.onTap(this.props._index);
                        }}
                        onLongPress={() => {
                            this.props._onDragStart && this.props._onDragStart();
                            this.keepLongPress = true;
                            this.startAnimation();
                        }}
                        onPressOut={() => {
                            if (this.keepLongPress) {
                                this.props._onDragRelease && this.props._onDragRelease(this.props._index, this.props._index);
                                this.keepLongPress = false;
                            }
                        }}>
                        <View>{this.props.children}</View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            );
        } else {
            return (
                <TouchableOpacity
                    style={{...this.props.style}}
                    activeOpacity={this.props.activeOpacity || this.ACTIVE_OPACITY}
                    onPress={this.props.onTap} >
                    {this.props.children}
                </TouchableOpacity>
            )
        }
    }

    dragStartAnimation() {
        return this.props._dragStartAnimation || {
            transform: [{
                rotate: this.state.startDragWiggle.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0 deg', '360 deg']
                })
            }]
        }
    }

    //執行動畫
    startAnimation() {
        if (!this.props._dragStartAnimation) {
            this.state.startDragWiggle.setValue(20)
            Animated.spring(this.state.startDragWiggle, {
                toValue: 0,
                velocity: 2000,
                tension: 2000,
                friction: 10
            }).start()
        } 
    }

    //向父組件傳遞位置
    _onLayout = (event) => {
        this.props._onSortableItemLayout(this, event);
        this.props.onLayout && this.props.onLayout(event);
    }
}

SortableView.Item = Item;
export { Item };