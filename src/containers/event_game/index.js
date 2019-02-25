import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EventComponent from '../../components/page/Event';
import {
	changePoint, getLink
} from '../../modules/event'

class EventGame extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status:'',
			statusColor:'#12cdd4',
			openSnack: false,
			message: "",
			snackVariant: "info",
			link:'',
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
	changePoint=(point)=>{
		var _this=this;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			if(point!==0){
				this.props.changePoint(user.access_token, 1, point).then(() => {
					
					var data= _this.props.data;
					if(data.status==="01"){
						this.setState({openSnack:true, message:'Đổi thành công, Xu được cộng vào tài khoản',snackVariant:'#12cdd4',})
					}else if(data.status==="04"){
						this.setState({openSnack:true, message:'Số điểm của bạn không đủ để đổi',snackVariant:'info',})
					}else if(data.status==="05"){
						this.setState({openSnack:true, message:'Hiện tại số quà đã hết',snackVariant:'info',})
					}else if(data.status==="-3"){
						this.setState({openSnack:true, message:'Tài khoản không tồn tại',snackVariant:'info',})
					}else{
						this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
					}
				})
			}else{
				this.setState({openSnack:true, message:'Bạn chưa chọn gói',snackVariant:'info',})
			}
		}else{
			
		}
	}

	handleCloseSnack = () => {
		this.setState({ openSnack: false });
	};

	getLink=()=>{
		var _this=this;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getLink(user.access_token).then(()=>{
				var data= _this.props.dataLink;
				if(data.status==="01"){
					this.setState({link:data.data.linkUserEvent})
				}else{
					this.setState({openSnack:true, message:'Đã có lỗi, liên hệ admin',snackVariant:'info',})
				}
			})
		}else{
			this.setState({openSnack:true, message:'Bạn chưa đăng nhập',snackVariant:'info',})
		}
		
	}

	render() {
		return (
			<div>
				<EventComponent 
					message={this.state.message}
					snackVariant={this.state.snackVariant}
					openSnack={this.state.openSnack}
					link={this.state.link}
					changePoint={this.changePoint}
					handleCloseSnack={this.handleCloseSnack}
					getLink={this.getLink}
					// selectPackage={this.selectPackage}
				/>
			</div>
		)

	}
}


const mapStateToProps = state => ({
	data: state.event.data,
	dataLink: state.event.dataLink,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	changePoint,
	getLink,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventGame)