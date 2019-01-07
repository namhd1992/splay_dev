import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	getData
} from '../../modules/coin'
import {
	getData as getDataGame
} from '../../modules/game'

import { withRouter } from 'react-router-dom'
import TypeChangeCoinComponent from '../../components/page/TypeChangeCoin'


class TypeChangeCoin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dialogLoginOpen: false,
		};
	}
	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		var _this = this;
		if (user !== null) {
			this.props.getDataGame(50, 0, '', '', '');
			// this.props.getData(user.access_token, user.scoinAccessToken)
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	render() {
		return (
			<div>
				<TypeChangeCoinComponent
					data={this.props.data}
					dataGame={this.props.dataGame}
					server={this.props.server}
					waiting={this.props.waiting}
					dialogLoginOpen={this.state.dialogLoginOpen}
				/>
			</div>
		)

	}
}

const mapStateToProps = state => ({	
	data: state.coin.data,
	dataGame: state.game.data,
	waiting: state.coin.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getData,
	getDataGame
}, dispatch)


export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(TypeChangeCoin))