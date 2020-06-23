import React from 'react';
import './index.less';

class About extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '我是about页面'
        }
    }
    // 跳转home页面
    goHome () {
        window.location.href = '/ssr/home';
    }
    render() {
        let { name } = this.state;
        return (
            <div className="about">
                {name}
                <div className="btn" onClick={() => this.goHome()}>点击跳转home页面</div>
            </div>
        )
    }
}

export default About;