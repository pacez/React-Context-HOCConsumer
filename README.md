# react-context-hocconsumer

基于React.createContext实现的简单封装,提供了Consumer的高阶组件，用于向子组件props注入上下文，
支持对上下文解析后挂载到props。如果你使用Redux的connect,应该很容易上手。

### install:
```
npm i react-context-hocconsumer --save
```


### examples:

定义RootContext.js
```javascript  
import ReactContext from 'react-context-hocconsumer';
export const defaultStore = {name:'pace'} 
const RootContext =  ReactContext(defaultStore) //同React.createContext可接收defautValue
export default RootContext;
export const Provider = RootContext.Provider;
export const Consumer = RootContext.Consumer;
```

父组件:ParentComponent
```javascript  
import React, { PureComponent } from 'react';
import {Provider,defaultStore} from './RootContext';
import SubComponent from './SubComponent';
export default class ParentComponent extends PureComponent {

    state = {
        store: defaultStore, 
    }

    render() {
        return <Provider value={this.state.store}>  {/** 挂载store */}
            <SubComponent /> 
        </Provider>
    }
}
```

子组件:SubComponent，直接使用@Consumer，上下文全量挂载到props.store。
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

子组件:SubComponent，根据业务解析有用的上下文内容到组件的props
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

