import React from 'react';
import { connect } from 'react-redux';
import './index.less';
import img from '../../../static/images/1.jpg';

class Home extends React.Component {
    static getInitialState () {
        return [
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ 
                        homeModel: { name: '66686866868' } 
                    })
                }, 100)
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ 
                        homeModel: { age: '很多很多很多很多' } 
                    })
                }, 100)
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ 
                        aboutModel: { age: '很多很多很多很多' } 
                    })
                }, 100)
            })
        ]
    }
    constructor (props) {
        super(props)
        this.state = {
            name: '哈哈啊哈'
        }
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