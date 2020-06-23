import React from 'react';
import './index.less';

class NoFound extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div class="container-404">
                <div class="layout">
                    <div class="status">404</div>
                    <div class="hint">
                        当前是非法路由，未匹配到有效page，具体路由配置请参考react的路由注册
                    </div>
                    <div class="bottom"></div>
                </div>
            </div>
        )
    }
}

export default NoFound;