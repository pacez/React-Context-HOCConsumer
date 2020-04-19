/**
 * Authoer: pace_zhong@foxmail.com
 * Name: 'react-context-hocconsumer'
 * Desc: 基于React.createContext实现的Consumer高阶组件. 将上下文注入到组件的props中。
 * Usage: 推荐修饰器用法，@Consumer, 组件从props中获取注入的上下文,默认挂载点统一为store，如果使用了contextParser，按照contextParser解析结构挂载props.
 */

import React from 'react';

const ReactContext = (store) => {

    const Context = React.createContext(store);

    const Consumer = (contextParser) => {
        const isReactComponent = contextParser.prototype.isReactComponent

        const WrapCp = (Component) => {
            class ConsumerComponet extends React.Component {
                render() {
                    return <Context.Consumer>
                        {
                            context => {
                                const mergeProps = Object.assign(
                                    {...this.props},
                                    !isReactComponent
                                    ? contextParser(context) // 组件解析上下文到props
                                    : { store: context } // 组件不解析上下文，直接把上下文全量挂载到props.store下
                                );
                                return <Component {...mergeProps} />
                            }
                        }
                    </Context.Consumer>
                }
            }
            
            return ConsumerComponet
        }

        if (!isReactComponent) {
            // 解析context
            return WrapCp
        }
        // 不解析context,contextParser实际上是component
        return WrapCp(contextParser)
    }

    return {
        Provider: Context.Provider,
        Consumer
    }
};

export default ReactContext

