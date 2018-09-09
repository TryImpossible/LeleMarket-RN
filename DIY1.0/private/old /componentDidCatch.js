
import React, { Component, View, Text } from 'react';

export default class componentDidCatch extends Component {
    
    constructor(props){
        super(props);
        // throw new Error('constructor');
    }

    componentWillMount() {
        // throw new Error('componentWillMount');
    }

    componentDidMount() {
        throw new Error('componentDidMount');
    }

    render() {
        return <View><Text>componentDidCatch</Text></View>
        throw new Error('render');
    }

    componentDidCatch(error, info){
        console.log('error');
        console.log(error);
        console.log('info');
        console.log(info);
    }

    componentWillReceiveProps(nextProps) {
        throw new Error('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        throw new Error('shouldComponentUpdate');
    }

    componentWillUpdate(nextProps, nextState) {
        throw new Error('componentWillUpdate');
    }

    componentWillUnmount() {
        throw new Error('componentWillUnmount');
    }
}