import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	getDetailData,
	pickCard,
	buyTurn
} from '../../modules/lucky'
import {
	getData
} from '../../modules/profile'
import {
	changeTitle
} from '../../modules/global'
import Ultilities from '../../Ultilities/global'
import {
	withMobileDialog,
} from 'material-ui/Dialog'
import { withTheme } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import MiniGameDetailComponent from '../../components/page/MiniGameDetail'


class MiniGameDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
			cardWidth: 0,
			cardHeight: 0,
			flippedArr: [],
			collapse: false,
			cardArr: [],
			dialogOpen: false,
			highLightCard: null,
			canPlay: true,
			openSnack: false,
			snackVariant: "info",
			dialogLoginOpen: false,
			dialogItemOpen: false,
			fontSize: "1em",
			dialogMoreTurnOpen: false
		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	componentDidMount() {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			// this.props.getData(user.access_token, user.scoinAccessToken);
		} else {
			_this.setState({ dialogLoginOpen: true });
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	}

	start = () => {
		if (this.props.dataDetail.userSpinInfo.turnsBuy + this.props.dataDetail.userSpinInfo.turnsFree <= 0) {
			this.setState({ dialogMoreTurnOpen: true });
		} else {
			if (this.state.canPlay) {
				var _this = this;
				var new_arr_after = [];
				this.state.flippedArr.forEach(function (item, key) {
					new_arr_after.push({ id: item.id, status: true });
				});
				_this.setState({ flippedArr: new_arr_after });
				this.collapse();
				this.random();
				this.unHighLight();
				setTimeout(function () {
					_this.expand();
				}, 1000);
			}
		}
	}


	buyTurn = (turn) => {
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.buyTurn(user.access_token, user.scoinAccessToken, this.props.match.params.id, turn).then(function () {
			if (_this.props.dataTurn.statusCode === "T") {
				_this.setState({ openSnack: true, message: "Mua lượt thành công", snackVariant: "success" });
			} else {
				_this.setState({ openSnack: true, message: "Số thịt không đủ", snackVariant: "error" });
			}
			_this.props.getDetailData(user.access_token, _this.props.match.params.id);
			// _this.props.getData(user.access_token, user.scoinAccessToken);
		});
	}

	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};
	handleCloseMoreTurnDialog = () => {
		this.setState({ dialogMoreTurnOpen: false });
	};

	handleCloseDialogItem = () => {
		this.setState({ dialogItemOpen: false });
	};

	showBuyTurn = () => {
		this.setState({ dialogOpen: true });
	}
	showItem = () => {
		this.setState({ dialogItemOpen: true });
	}
	
	render() {
		return (
			<div>
				<MiniGameDetailComponent
					showItem={this.showItem}
					showBuyTurn={this.showBuyTurn}
					handleCloseDialogItem={this.handleCloseDialogItem}
					handleCloseMoreTurnDialog={this.handleCloseMoreTurnDialog}
					handleCloseDialog={this.handleCloseDialog}
					buyTurn={this.buyTurn}
					start={this.start}
					handleCloseSnack={this.handleCloseSnack}

					data={this.props.data}
					server={this.props.server}
					waiting={this.props.waiting}
					message={this.state.message}
					dialogOpen={this.state.dialogOpen}
					openSnack={this.state.openSnack}
					snackVariant={this.state.snackVariant}
					dialogLoginOpen={this.state.dialogLoginOpen}
					dialogItemOpen={this.state.dialogItemOpen}
					dialogMoreTurnOpen={this.state.dialogMoreTurnOpen}
				/>
			</div>
		)

	}
}

const mapStateToProps = state => ({	
	data: state.lucky.dataDetail,
	waiting: state.lucky.waiting,
	server:state.server.serverError
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	pickCard,
	buyTurn,
	getData,
	changeTitle,
}, dispatch)

MiniGameDetail.propTypes = {
	classes: PropTypes.object.isRequired,
	fullScreen: PropTypes.bool.isRequired,
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(withMobileDialog()(withTheme()(MiniGameDetail))))