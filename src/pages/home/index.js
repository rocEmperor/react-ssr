import React from 'react';
import { connect } from 'react-redux';
import Request from '../../utils/request';
import './index.less';
import img from '../../../static/images/1.png';

class Home extends React.Component {
    // 首次渲染时的钩子，写法上比较有限制（必须使用async + await），此钩子不管是服务端渲染还是单页面（SPA）渲染都会被调用
    static async getInitialState () {
        let { name } = await Request({ url: 'api/test' });
        let { age } = await Request({ url: 'api/test1' });
        return {
            homeModel: { name, age }
        }
    }
    constructor (props) {
        super(props)
        this.state = {
            name: '哈哈啊哈'
        }
    }
    componentDidMount () {
        console.log(9900)
    }
    /**
     * 跳转about页面
     */
    goAbout () {
        window.location.href = '/ssr/about';
    }
    textSaga () {
        this.props.dispatch({
            type: 'homeModel/textSaga',
            payload: {
                name: '我是saga在作怪，哈哈'
            }
        })
    }
    render() {
        let { name, age } = this.props;
        return (
            <div className="home">
                <div className="home-header">
                    <h2>欢迎来到react服务端渲染66</h2>
                    <div>{name}</div>
                    <div>{age}</div>
                    <div className="pic"></div>
                    <br />
                    <img src={img} width={300} height={160}/>
                    <div className="btn" onClick={() => this.goAbout()}>点击跳转about页面</div>
                    <div className="btn" onClick={() => this.textSaga()}>
                        测试saga
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.homeModel
    }
}
export default connect(mapStateToProps)(Home);