import React from 'react'
import Modal from 'material-ui/Modal';
import Notification from '../../components/Notification'
import {
	FacebookShareButton,
} from 'react-share';
import copy from 'copy-to-clipboard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	withMobileDialog
} from 'material-ui/Dialog'
import '../../styles/truykich.css';

class EventTruyKichComponent extends React.Component {

	constructor(props){
		super(props);
		this.state={
			intValue:0,
			whenSelect:"",
			point:0,
			pakageXu:0,
			auth:false,
			fullName:'',
			openModalLink:false,
			dialogItemOpen: false
		}
	}

	componentWillMount() {
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.setState({auth:true, fullName:user.fullName, intValue:20000,whenSelect:"1px solid #00ccd4"});
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
		// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
	}

	logoutAction = () => {
		this.setState({ auth: false });
		localStorage.removeItem("user");
		if (typeof(Storage) !== "undefined") {
			var currentPath = window.location.pathname;
			localStorage.setItem("currentPath", currentPath);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
		window.location.replace(
			`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}${currentPath}&action=logout&agencyid=0`,
			// `http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}${currentPath}&action=logout&agencyid=0`
		);
	}

	selectOptionCoin= (option) =>{
		this.props.selectOptionCoin();
  }

	changePoint=()=>{
		this.props.handleOpenModalInfoGame();
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
		this.props.handleCloseModalLink();
	}

	handleOpenModalLink=()=>{
		this.props.handleOpenModalLink();
	}

	handleCloseModalInfoGame=()=>{
		this.props.handleCloseModalInfoGame();
	}


	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	copyText=()=>{
		copy(this.props.data.linkUserEvent);
	}
	
	handleOpenGame=()=>{
		// this.props.handleOpenGame()
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open('POST','http://game.api.vtcmobile.vn/TruyKich/GetUserInfo.asmx',true)
		var sr=`<?xml version="1.0" encoding="utf-8"?>
		<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
		<soap:Body>
		  <GetUserInfoById xmlns="http://tempuri.org/">
			<accountId>1566401855</accountId>
			<serverId>1</serverId>
			<vtcSign>a98eb586473678be102b3dc4fbbbc9d7</vtcSign>
		  </GetUserInfoById>
		</soap:Body>
	  </soap:Envelope>`;
	  console.log(sr)
		xmlhttp.onreadystatechange=()=>{
			if(xmlhttp.readyState===4){
				if(xmlhttp.status===200){
					alert(xmlhttp.response)
				}
			}
		}
		xmlhttp.setRequestHeader('Content-Type','application/soap+xml')
		xmlhttp.send(sr)
	}
	handleCloseDialogItem = () => {
		this.setState({ dialogItemOpen: false });
	};
	
	selectServer=(event)=>{

	}

	selectObject=(event)=>{

	}

	openComfirm=()=>{
		this.setState({dialogItemOpen:true})
		this.props.handleCloseModalInfoGame();
	}


	render() {
		const { openSnack,message,snackVariant, data, openModalLink, openModalInfoGame}=this.props;
		var arrLeft=[200, 500, 1000];
		var arrRight=[2000, 5000, 10000];
		var arr=[200, 500, 1000, 2000, 5000, 10000]
		var listServer=["Miền Bắc", "Miền Trung", "Miền Nam"]
		var listObject=["Gamer1", "Gamer2", "Gamer3"]
		return (
			<div>
					<div className="logo_truykich" style={{ backgroundImage: "url(/../TRK-truy-kich-bùng-nổ-2.png)"}}>
						<div className="social">
							<span>
								<a className="a_home" href="http://mongchinhdo.vn/">Trang chủ</a>
								<a className="a_face" href="https://www.facebook.com/mongchinhdo.vn/">Fanpage</a>
							</span>
						</div>
					</div>
					<div className="genlink">
						<div className="div_link">
							<img onClick={this.handleOpenModalLink} className="img_link" src="/../event_taolinktrieuhoi.png" alt="" />
							<img className="img_play_game" onClick={this.handleOpenGame} src="/../event_choigame.png" alt="" />
						</div>
						{/* <button onClick={this.facebookLogin}>TEST FACEBOOK</button> */}
						<div className="info_user">
										{(this.state.auth)?(	<div>
												<div style={{marginBottom: "15px"}}>
														<span>Xin chào xạ thủ: {this.state.fullName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span style={{color:"red", cursor:"pointer"}} onClick={this.logoutAction}>[Thoát]</span>
												</div>
												<div>
														<span>Điểm triệu hồi hiện tại:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#fac710"}}>{(data.eventPoint)? (data.eventPoint):0} điểm</span>
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
							<p style={{textAlign:"center"}}>👉TẠO LINK TRIỆU HỒI👉 KIẾM ĐIỂM 👉 ĐỔI PHẦN THƯỞNG</p>
								{/* <img className="img_step" src="/../cacbuocthuchien_event.png" alt="" /> */}
						</div>
						</div>
						<ul>
							<li>
								Đăng nhập và tạo link triệu hồi. Share lên Facebook, messenger, group... hay bất cứ đâu bạn muốn
							</li>
							<li>
								Mỗi khi có người click vào link và chơi game bạn sẽ được cộng 5 điểm
							</li>
							<li>
							Điểm tích lũy dùng để đổi vật phẩm Hot trong shop
							</li>
						</ul>
						
						<p style={{color:"#fff"}}>Lưu ý: </p>
						<ul>
							<li>
								Bạn sẽ chỉ được tích điểm khi các tài khoản đăng nhập là tài khoản tạo trước ngày 12/04/2019
							</li>
							<li>
								Bạn được cộng điểm cho lần đăng nhập và chơi game đầu tiên của 1 tài khoản (những lần đăng nhập tiếp theo không được tính)
							</li>
						</ul>
					</div>
					<div className="changePoint">
						<div style={{textAlign: "center"}}>
							<img className="img_shop" src="/../shopdoiqua_event.png" alt="" />
						</div>
						<p style={{textAlign: "center", color:"#fac710"}}>Hướng dẫn: Chọn vật phẩm muốn đổi > Chọn server > Chọn nhân vật</p>
						<div>
							<p>Danh sách phần thưởng <span style={{color:"red", float:"right", marginRight:"10px"}}>Đang có {(data.eventPoint)? (data.eventPoint):0} điểm</span></p>
						</div>
							
						<div>
								<div className="xu_event">
									{/* <div className="divOptionXu">
										<select className="selectOptionXu" onChange={(event)=>this.selectOptionCoin(event)}>
											<option value="" selected disabled hidden>Chọn gói Xu muốn nhận</option>
													{(packageGift !==null) ? packageGift.map((obj,key) => {
															return <option key={key}
														value={obj}>{obj.toLocaleString()}</option>;
													}):(<div></div>)}
										</select>
									</div>
									<div className="divPrice">
										<span style={{marginRight:"20px"}}>Giá:</span><span>{this.state.point.toLocaleString()} điểm</span> 
									</div> */}
									<Hidden xsDown>
										<div className="optionLeft">
											{arrLeft.map((obj,key)=>{
											return 	<div key={key} className="itemTruyKich" style={{backgroundImage:"url(/../truykich.jpg)"}} onClick={()=>this.selectOptionCoin(20000)}>
											<div className="nameItemTruyKich">{obj} XU</div>
											<span className="priceItemTruyKich"><span className="priceItem">{obj} ĐIỂM</span><span className="statusItem">ĐÃ ĐỔI</span></span>
										</div>
											})}
										</div>
										<div className="optionRight">
										{arrRight.map((obj,key)=>{
												return 	<div key={key} className="itemTruyKich" style={{backgroundImage:"url(/../truykich.jpg)"}} onClick={()=>this.selectOptionCoin(20000)}>
												<div className="nameItemTruyKich">{obj} XU</div>
												<span className="priceItemTruyKich"><span className="priceItem">{obj} ĐIỂM</span><span className="statusItem">ĐÃ ĐỔI</span></span>
											</div>
											})}
										</div>
									</Hidden>
									<Hidden smUp>
										<div className="optionLeft">
											{arr.map((obj,key)=>{
												return 	<div key={key} style={{backgroundImage:"url(/../truykich.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"100%", height:"200px", marginBottom:"15px", cursor:"pointer", border:"1px solid #808080"}} onClick={()=>this.selectOptionCoin(20000)}>
												<div style={{color:"#fff", padding:"5px 10px"}}>{obj} XU</div>
												<span style={{float:"right", marginTop:"130px", border:"1px solid #808080", padding:"5px 1px", backgroundColor:"#808080"}}><span style={{ color: "#df0000", backgroundColor:"black", padding:"5px 10px" }} >{obj} ĐIỂM</span><span style={{color:"black", padding:"5px 10px"}}>ĐÃ ĐỔI</span></span>
											</div>
											})}
										</div>
									</Hidden>
								</div>
								<button style={{visibility:"hidden"}} className="btnTruyKich">ĐỔI</button>
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
						open={openModalLink}
						style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}
						onClose={this.handleCloseModalLink}
						>
						<div className="popupGenLink" style={{ backgroundColor:"#212833"}}>
							<div style={{marginBottom:"50px"}}>
								<span className="titlePopupGenLink">Link triệu hồi của bạn</span>
								<img style={{float:'right', zIndex:"1", cursor:"pointer"}} src="/../close.png" alt="close popup" onClick={this.handleCloseModalLink} />
							</div>
							<div style={{padding:"0px 20px"}}>
								<input style={{width: "100%", height: "40px", border: "0px solid", borderRadius: "10px", backgroundColor: "#1a1a1a", color: "#3578ff"}} type="text" value={data.linkUserEvent}/>
								<div style={{width: "100%", margin: "20px 0px"}}>
								<button style={{backgroundColor: "#12cdd4", border: "0px solid", borderRadius: "10px", width: "45%"}}><FacebookShareButton url={data.linkUserEvent}><button style={{color:"#fff", backgroundColor: "#12cdd4",borderRadius: "10px", border: "0px solid", width: "100%", height: "40px", cursor: "pointer"}}>SHARE</button></FacebookShareButton></button>
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
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={openModalInfoGame}
						style={{backgroundColor:'rgba(0, 0, 0, 0.7)'}}
						onClose={this.handleCloseModalInfoGame}
						>
						<div className="popupGenLink" style={{ backgroundColor:"#212833"}}>
							<div style={{padding:"0px 20px"}}>
								<p style={{color:"#fff", fontSize:"18px"}}>Chọn Server</p>
								<div className="divServer">
										<select className="selectServer" onChange={(event)=>this.selectServer(event)}>
													{(listServer !==null) ? listServer.map((obj,key) => {
															return <option key={key}
														value={obj}>{obj.toLocaleString()}</option>;
													}):(<div></div>)}
										</select>
								</div>
								<p style={{color:"#fff", fontSize:"18px"}}>Chọn nhân vật</p>
								<div className="divObject">
										<select className="selectObject" onChange={(event)=>this.selectObject(event)}>
													{(listObject !==null) ? listObject.map((obj,key) => {
															return <option key={key}
														value={obj}>{obj.toLocaleString()}</option>;
													}):(<div></div>)}
										</select>
								</div>
							</div>
							<div style={{marginTop: "30px", float:"right", paddingRight:"20px"}}>
								<Button onClick={this.handleCloseModalInfoGame} style={{ color: "#888787", borderRadius:"20px" }}>
										Đóng
								</Button>
								<Button style={{ color: "#fff", background:"#00ccd4",borderRadius:"20px"}} onClick={this.openComfirm}>XÁC NHẬN</Button>					
							</div>
						</div>
					</Modal>
					<Dialog
							open={this.state.dialogItemOpen}
							onClose={this.handleCloseDialogItem}
							aria-labelledby="responsive-dialog-title"
					>
							<DialogContent>
								<p style={{color:"#fff"}}>Xác nhận đổi vật phẩm</p>
								<p style={{color:"#808080"}}>Vật phẩm này sẽ được thêm vào nhân vật</p>	
							</DialogContent>
							<DialogActions>
									<div>
											<Button onClick={this.handleCloseDialogItem} style={{ color: "#888787", borderRadius:"20px" }}>
													Đóng
											</Button>
											<Button style={{ color: "#fff", background:"#00ccd4",borderRadius:"20px"}}>XÁC NHẬN</Button>
											
									</div>
							</DialogActions>
					</Dialog>
					<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
			</div>
			
		)
	}
}

export default EventTruyKichComponent