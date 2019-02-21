import React from 'react'
import Modal from 'material-ui/Modal';
import Notification from '../../components/Notification'
import {
	FacebookShareButton,
} from 'react-share';
import copy from 'copy-to-clipboard';
import MetaTags from 'react-meta-tags';
import '../../styles/event.css'



class EventComponent extends React.Component {

	constructor(props){
		super(props);
		this.state={
			point:0,
			auth:false,
			fullName:'',
			openModalLink:false,
		}
	}

	componentWillMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.setState({auth:true, fullName:user.fullName});
		}
	}

	loginAction = () => {
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
	}

	selectOptionCoin= (event) =>{
        var pakageXu=+event.target.value;
		this.setState({point: pakageXu/1000})
		// this.props.selectPackage()
    }

	changePoint=()=>{
		// var scoinToken=this.getScoinToken('token');
		this.props.changePoint(this.state.point)
	}

	getScoinToken=(paramName)=>{
		var url = window.location.search.substring(1);
		var qArray = url.split('&');
		for (var i = 0; i < qArray.length; i++) 
		{
			var pArr = qArray[i].split('='); //split key and value
			if (pArr[0] == paramName) 
				return pArr[1]; //return value
		}
		return '';
	}

	handleCloseModalLink=()=>{
		this.setState({openModalLink:false});
	}

	handleOpenModalLink=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getLink();
		if(user !== null){
			this.setState({openModalLink:true});
		}
	}

	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	copyText=()=>{
		copy(this.props.link);
	}

	render() {
		var arr=[20000,50000,100000,200000]
		const { openSnack,message,snackVariant, link}=this.props;
		return (
			<div>
				<MetaTags>
					<meta property="og:url" content={this.props.link} />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Triệu hồi lệnh - Mộng Chinh Đồ" />
					<meta property="og:image" content="https://i.postimg.cc/HxZ16Qpw/skshare-mcd.png" />
					<meta property="og:description" content="Tham gia sự kiện Mời bạn cùng chơi > nhận Xu > chuyển thành KNB nhanh chóng. Game H5 chiến quốc mới nhất từ VTC Mobile năm 2019" />
					<meta property="og:site_name" content="mongchinhdo.vn" />
				</MetaTags>
				<div>
					<div className="logo" style={{ backgroundImage: "url(/../background_event.png)"}}>
						<div className="social">
							<span>
								<a className="a_home" href="http://mongchinhdo.vn/">Trang chủ</a>
								<a className="a_face" href="https://www.facebook.com/mongchinhdo.vn/">Fanpage</a>
							</span>
						</div>
						<div>
							<p className="title">SK Triệu hồi lệnh - Mộng Chinh Đồ H5</p>
						</div>
					</div>
					<div className="genlink">
						<div className="div_link">
						<img onClick={this.handleOpenModalLink} className="img_link" src="/../event_taolinktrieuhoi.png" alt="" />
										<a href="http://mongchinhdo.vn/" target="_blank">
							<img onClick="playGame()" className="img_play_game" src="/../event_choigame.png" alt="" />
										</a>
						</div>
						<div className="info_user">
										{(this.state.auth)?(	<div>
												<div style={{marginBottom: "15px"}}>
														<span>Xin chào: {this.state.fullName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span style={{color:"red", cursor:"pointer"}} onClick={this.logoutAction}>[Thoát]</span>
												</div>
												<div>
														<span>Điểm triệu hồi hiện tại:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#fac710"}}>1000 điểm</span>
												</div>
										</div>):(	<div id="login">
												<span>Đại hiệp cần đăng nhập để tạo link triệu hồi</span>
												<span className="btn_login" onClick={this.loginAction}>Đăng nhập</span>
										</div>)}
						</div>
					</div>
					<div className="play">
						<div>
							<div style={{textAlign: "center"}}>
								<img className="img_play" src="/../cachchoi_event.png" alt="" />
							</div>
						<div>
								<img className="img_step" src="/../cacbuocthuchien_event.png" alt="" />
						</div>
						</div>
						<ul>
							<li>
								Đăng nhập và tạo link triệu hồi. Share lên Facebook, messenger, group... hay bất cứ đâu bạn muốn
							</li>
							<li>
								Mỗi khi có người click vào link và hành động, bạn sẽ được thưởng điểm - dùng để đổi quà trong
								shop:
								<ul>
									<li>
										Cứ 1 người click vào link và tạo nhân vật thành công: bạn sẽ được 1 điểm!
									</li>
								</ul>
							</li>
						</ul>
						
						<p style={{color:"#fff"}}>Lưu ý: </p>
						<ul>
							<li>
								Mỗi người chỉ được cộng điểm cho 1 tài khoản.
							</li>
							<li>
								Để đăng xuất tài khoản đang chơi: Click avatar nhân vật -> chọn Đăng xuất
							</li>
						</ul>
					</div>
					<div className="changePoint">
						<div style={{textAlign: "center", marginBottom: "50px"}}>
							<img className="img_shop" src="/../shopdoiqua_event.png" alt="" />
							<p className="point">Đang có 1000 điểm</p>
						</div>
									<p style={{textAlign: "center", color:"#fac710"}}>Xu có thể nạp vào game từ Scoin.vn: Chọn phương thức Nạp > Ví Xu</p>
							
						<div>
								<div className="xu_event">
									<div className="divOptionXu">
										<select className="selectOptionXu" onChange={(event)=>this.selectOptionCoin(event)}>
											<option value="" selected disabled hidden>Chọn gói Xu muốn nhận</option>
													{arr.map((obj,key) => {
															return <option key={key}
														value={obj}>{obj.toLocaleString()}</option>;
													})}
										</select>
									</div>
									<div className="divPrice">
										<span style={{marginRight:"20px"}}>Giá:</span><span>{this.state.point.toLocaleString()} điểm</span> 
									</div>
								</div>
								<button className="btnChangePoint" onClick={this.changePoint}>ĐỔI</button>
								{/* <p className="statusChangePoint" style={{ color:statusColor}}>{status}</p> */}
							</div>

							</div>
					<div className="footer" style={{color:"#fff"}}>
						<img src="/../logo_vtc.png" alt="" />
						<p>Copyright 2013 VTCMobile - Công ty Cổ phần VTC Dịch Vụ Di Động</p>
						<p>Địa chỉ: Tầng 11 - Tòa nhà VTC Online - 18 Tam Trinh - Hà Nội.</p>
						<p>Liên hệ hợp tác: dangnh@vtc.vn Hỗ trợ: 19001104</p>
					</div>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.openModalLink}
						style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}
						onClose={this.handleCloseModalLink}
						>
						<div className="popupGenLink" style={{ backgroundColor:"#212833"}}>
							<div style={{marginBottom:"50px"}}>
								<span className="titlePopupGenLink">Link triệu hồi của bạn</span>
								<img style={{float:'right', zIndex:"1", cursor:"pointer"}} src="/../close.png" alt="close popup" onClick={this.handleCloseModalLink} />
							</div>
							<div style={{padding:"0px 20px"}}>
								<input style={{width: "100%", height: "40px", border: "0px solid", borderRadius: "10px", backgroundColor: "#1a1a1a", color: "#3578ff"}} type="text" value={link}/>
								<div style={{width: "100%", margin: "20px 0px"}}>
								<button style={{color:"#fff", backgroundColor: "#12cdd4", border: "0px solid", borderRadius: "10px", textAlign: "center", width: "45%", height: "40px", cursor: "pointer"}}><FacebookShareButton url={link}>SHARE</FacebookShareButton></button>
									<button style={{color:"#fff", backgroundColor: "#f24726", border: "0px solid", borderRadius: "10px", textAlign: "center", width: "45%", height: "40px", float:"right", cursor: "pointer"}} onClick={this.copyText}>COPY LINK</button>
								</div>
								<ul style={{marginLeft: "-20px"}}>
									<li>
										Share link triệu hồi này lên Facebook cá nhân, messenger, group... hoặc copy & paste lên bất cứ đâu bạn muốn và kêu gọi mọi người tham gia.
									</li>
								</ul>
							</div>
						</div>
					</Modal>
					<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				</div>
			</div>
			
		)
	}
}

export default EventComponent
