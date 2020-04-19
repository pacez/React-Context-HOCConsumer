# react-context-hocconsumer

[中文文档](https://github.com/pacez/React-Context-HOCConsumer/blob/master/README_CN.md#readme)

Simple encapsulation based on the React.createContext, provides a HOC of Consumer, Supports mounting props after context resolution. If you use Redux's connect, it should be easy to get started.

* required：React >= 16.3

### install:
```
npm i react-context-hocconsumer --save
```


### usage:
Define a common context. Filename: RootContext.js
```javascript  
import ReactContext from 'react-context-hocconsumer';
export const defaultStore = {name:'pace'} 
const RootContext =  ReactContext(defaultStore) //Default values are optional
export default RootContext;
export const Provider = RootContext.Provider;
export const Consumer = RootContext.Consumer;
```

The parent component: The component that manages the context, the Provider entry.
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

Basic usage, The context is mounted to the store by default
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

Resolve the context of the requirements to props
```javascript  
import React, { PureComponent } from 'react';
import {Consumer} from './RootContext';
@Consumer(context =>({
    name: context.name  
}))
export default class SubComponent extends PureComponent {
    render() {
        return <div>
            {this.props.name}
        </div>
    }
}
```


