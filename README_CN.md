# react-context-hocconsumer

[English](https://github.com/pacez/React-Context-HOCConsumer#readme)

基于React.createContext实现的简单封装,提供了Consumer的高阶组件，用于向子组件props注入上下文，
支持对上下文解析后挂载到props。如果你使用Redux的connect，应该很容易上手。

* 注：React版本 >= 16.3

### 安装:
```
npm i react-context-hocconsumer --save
```


### 用例:

定义公共上下文
文件名：RootContext.js
```javascript  
import ReactContext from 'react-context-hocconsumer';
export const defaultStore = {name:'pace'} 
const RootContext =  ReactContext(defaultStore) //同React.createContext可接收defautValue
export default RootContext;
export const Provider = RootContext.Provider;
export const Consumer = RootContext.Consumer;
```

父组件: 管理上下文的组件，Provider入口。
```javascript  
import React, { PureComponent } from 'react';
import {Provider,defaultStore} from './RootContext';
import SubComponent from './SubComponent';
export default class ParentComponent extends PureComponent {

    state = {
        store: defaultStore, 
    }

    render() {
        return <Provider value={this.state.store}>  
            <SubComponent /> 
        </Provider>
    }
}
```

基本用法, 默认情况下，上下文被挂载到store
```javascript  
import React, { PureComponent } from 'react';
import {Consumer} from './RootContext';
@Consumer
export default class SubComponent extends PureComponent {
    render() {
        return <div>
            {this.props.store.name}
        </div>
    }
}
```

解析必要的上下文到props
```javascript  
import React, { PureComponent } from 'react';
import {Consumer} from './RootContext';
@Consumer(context => （{
    name: context.name  
})）    
export default class SubComponent extends PureComponent {
    render() {
        return <div>
            {this.props.name}
        </div>
    }
}
```

