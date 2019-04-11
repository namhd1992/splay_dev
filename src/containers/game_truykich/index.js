import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EventTruyKichComponent from '../../components/page/EventTruyKich';
import {
	buyItem, getLink, addPoint, eventGame
} from '../../modules/truykich'

class GameTruyKich extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status:'',
			statusColor:'#12cdd4',
			openSnack: false,
			message: "",
			snackVariant: "info",
			data:null,
			openModalLink:false,
			openModalInfoGame:false,
			itemEvents:null,
			dialogUserEmpty: false,
			isOpenListUser:false,
			serverGameId:0,
			itemId:0,
			eventGameId:0,

		};
	}

	componentWillMount(){
		for(let i=0; i<100; i++){
			window.clearInterval(i);
		}
	}

	// selectPackage=()=>{
	// 	this.setState({status:''})
	// }
	componentDidMount(){
		var _this=this;
		var user = JSON.parse(localStorage.getItem("user"));
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		this.props.eventGame().then(()=>{
			var data= _this.props.dataEventGame;
			if(data!==undefined){
				if(data.status==="01"){
					this.setState({itemEvents:data.data.itemEvents});
				}
			}
		});
		if(user !== null){
			this.getLink(user);
		}
	}

	getLink=(user)=>{
		var _this=this;
		this.props.getLink(user.access_token).then(()=>{
			var data= _this.props.dataLink;
			if(data!==undefined){
				if(data.status==="01"){
					this.setState({data:data.data})
					_this.addPoint(user.access_token, data);
				}else{
					this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
				}
			}
		});
	}
	buyItem=(idServer)=>{

		var _this=this;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.buyItem(this.state.data.eventGameId, this.state.itemId, idServer, user.access_token).then(() => {
				var data= _this.props.data;
				if(data!==undefined){
					if(data.status==="01"){
						this.setState({openSnack:true, message:'Đổi thành công, Xu được cộng vào tài khoản',snackVariant:'success'})
						_this.getLink(user);
					}else if(data.status==="04"){
						this.setState({openSnack:true, message:'Số điểm của bạn không đủ để đổi',snackVariant:'info',})
					}else if(data.status==="05"){
						this.setState({openSnack:true, message:'Hiện tại số quà đã hết',snackVariant:'info',})
					}else if(data.status==="-3"){
						this.setState({openSnack:true, message:'Tài khoản không tồn tại',snackVariant:'info',})
					}else{
						this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
					}
				}
			})
		}else{
			this.setState({openSnack:true, message:'Bạn chưa đăng nhập',snackVariant:'info'})
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	};

	handleCloseModalLink=()=>{
		this.setState({openModalLink:false});
	}

	handleOpenModalLink=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.setState({openModalLink:true});
		}else{
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}
	}

	handleOpenGame=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		console.log(user)
		if(user !== null){
			var win = window.open('http://mongchinhdo.vn/', '_blank');
			win.focus();
		}else{
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}
	}

	addPoint=(token, data)=>{
		var _this=this;
		var path=data.data.linkUserEvent;
		var len=path.length;
		var n=path.lastIndexOf('/');
		var str=path.substring(n+1,len);
		var faceId='';
		if(str.indexOf("Sự-Kiện-Truy-Kích-Bùng-Nổ")===-1 && str!==""){
			this.props.addPoint(token, str, faceId).then(()=>{
				var data= _this.props.dataPoint;
				if(data!==undefined){
					if(data.status==="01"){
					}else if(data.status==="03"){
						this.setState({openSnack:true, message:'Không tìm thấy sự kiện hiện tại',snackVariant:'info',})
					}else if(data.status==="-02"){
						this.setState({openSnack:true, message:'Chưa chơi game',snackVariant:'info',})
					}else if(data.status==="-03"){
						this.setState({openSnack:true, message:'Tài khoản đã dùng cho người chơi khác',snackVariant:'info',})
					}else if(data.status==="-04"){
						this.setState({openSnack:true, message:'Không dùng link của chính mình',snackVariant:'info',})
					}else{
						this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
					}
				}
			})
		}
	}

	selectOptionCoin=(itemId)=>{
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.setState({openModalInfoGame:true, itemId:itemId})
		}else{
			this.setState({openSnack:true, message:'Bạn chưa đăng nhập',snackVariant:'info'})
		}
	}


	handleCloseModalInfoGame=()=>{
		this.setState({openModalInfoGame:false})
	}

	openListUser=()=>{
		const {data}=this.state;
		if(data.userChildents.length>0){
			this.setState({isOpenListUser:true});
		}else{
			this.openDialogUserEmpty();
		}
		
	}
	closeListUser=()=>{
		this.setState({isOpenListUser:false});
	}
	openDialogUserEmpty=()=>{
		this.setState({dialogUserEmpty:true})
	}
	closeDialogUserEmpty=()=>{
		this.setState({dialogUserEmpty:false})

	}

	render() {
		return (
			<div>
				<EventTruyKichComponent 
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					openSnack={this.state.openSnack}
					data={this.state.data}
					openModalLink={this.state.openModalLink}
					openModalInfoGame={this.state.openModalInfoGame}
					itemEvents={this.state.itemEvents}
					dialogUserEmpty={this.state.dialogUserEmpty}
					isOpenListUser={this.state.isOpenListUser}


					handleCloseSnack={this.handleCloseSnack}
					selectOptionCoin={this.selectOptionCoin}
					handleCloseModalLink={this.handleCloseModalLink}
					handleOpenModalLink={this.handleOpenModalLink}
					handleCloseModalInfoGame={this.handleCloseModalInfoGame}
					handleOpenGame={this.handleOpenGame}
					openListUser={this.openListUser}
					closeListUser={this.closeListUser}
					openDialogUserEmpty={this.openDialogUserEmpty}
					closeDialogUserEmpty={this.closeDialogUserEmpty}

					buyItem={this.buyItem}
					// getData={this.getData}
					// selectPackage={this.selectPackage}
				/>
			</div>
		)

	}
}


const mapStateToProps = state => ({
	data: state.event.data,
	dataLink: state.event.dataLink,
	dataPoint:state.event.dataPoint,
	dataEventGame:state.event.dataEventGame,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	buyItem,
	getLink,
	addPoint,
	eventGame,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameTruyKich)