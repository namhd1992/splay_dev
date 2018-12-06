import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import Button from 'material-ui/Button'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogTitle,
} from 'material-ui/Dialog'
import Table, {
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LastPageIcon from 'material-ui-icons/LastPage';
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Notification from '../../components/Notification'
import LoginRequired from '../../components/LoginRequired'
import HeadMenu from '../HeadMenu'
import SnakeGame from '../game/snake/SnakeGame'
import NumberGame from '../game/number/NumberGame'
import FlappyBirdGame from '../game/flappy_bird/FlappyBird'
import TetrisGame from '../game/tetris/Tetris'
// import PacmanGame from '../game/pacman/PacmanGame'
import '../../styles/imageServerError.css'

const styles = {
	paper: {
		background: "#2b323d"
	},
	buttonOrange:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#ff5f27,#ff9019)",
		color: "#fff",
		padding: "10px", height:"35px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	},
	buttonGreen:{
		borderRadius: "20px",
		background: "linear-gradient(90deg,#22cab5,#3fe28f)",
		color: "#fff",
		padding: "10px", height:"40px",
		fontSize: "0.8em",
		whiteSpace: "nowrap",
		minWidth: "auto",
		minHeight: "auto"
	}
};

class MiniGameDetailComponent extends React.Component {
	constructor(){
		super();
		this.state = {
			intValue:1,
			whenSelect:"1px solid #00ccd4",
			rowsPerPageOptions:[10,20,30],
			page: 0,
			rowsPerPage: 10,
			value: 0,
		};
	}
	showItem=()=>{
		this.props.showItem();
	}
	
	showBuyTurn=()=>{
		this.props.showBuyTurn();
	}
	
	handleCloseDialogItem=()=>{
		this.props.handleCloseDialogItem();
	}
	
	handleCloseMoreTurnDialog=()=>{
		this.props.handleCloseMoreTurnDialog();
	}
	
	handleCloseDialog=()=>{
		this.props.handleCloseDialog();
	}
	
	buyTurn=()=>{
		this.props.buyTurn(this.state.intValue);
		this.setState({whenSelect:""});
	}

	start=()=>{
		this.props.start();
	}
	
	
	handleCloseSnack=()=>{
		this.props.handleCloseSnack();
	}

	selectPackage(value){
		this.setState({intValue:value, whenSelect:"1px solid #00ccd4"});
	}

	handleCloseBonus=()=>{
		this.props.handleCloseBonus();
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangePage = (event, page) => {
    	this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	render() {
		const {data,message,dialogOpen,openSnack,snackVariant,dialogLoginOpen,dialogItemOpen,dialogMoreTurnOpen,server, waiting}=this.props;
		const { classes } = this.props;
		
		return (<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0" }} spacing={8} justify="center">
								<Grid item xs={12}>
									<Grid container className="lucky-detail-root" spacing={8}>
										<Grid item xs={12}>
											{/* <TetrisGame /> */}
											<FlappyBirdGame />
											{/* <SnakeGame/> */}
											{/* <NumberGame /> */}
											{/* <PacmanGame /> */}
										</Grid>
										<Grid item xs={12} sm={6} className="lucky-button">
											<Button  onClick={this.showItem}>Phần thưởng</Button>
										</Grid>
										<Grid item xs={12} sm={6} className="lucky-button">
											<Button onClick={this.showBuyTurn}>Mua Lượt</Button>
										</Grid>
									</Grid>
								</Grid>
								{(waiting) ? (<Grid item xs={12} md={8}>
									<div className="global-loadmore">
									{(server !== true) ? (												
									<CircularProgress style={{ color: "#fff" }} size={50} />):(<img className="error" alt="just alt"
									src="../baotri.png" />)}
									</div>
								</Grid>) : (<div></div>)}
							</Grid>
						</Grid>
						<Hidden smDown>
							<Grid item xs={4}>
								<RightArea></RightArea>
							</Grid>
						</Hidden>
					</Grid>
					<Dialog
					fullScreen={false}
					open={dialogMoreTurnOpen}
					onClose={this.handleCloseMoreTurnDialog}
					aria-labelledby="responsive-dialog-title"
					style={{ background: "#2b323d" }}
					>
						<DialogTitle id="responsive-dialog-title"><span>Bạn đã hết lượt quay</span></DialogTitle>
						<DialogContent>
							<div style={{ color: "#fff" }}>
								Mua thêm lượt quay để tiếp tục
							</div>
						</DialogContent>
						<DialogActions>
							<div>
								<Button className="" onClick={this.showBuyTurn}>Mua lượt</Button>
								<Button onClick={this.handleCloseMoreTurnDialog} style={{ color: "#888787", borderRadius:"20px" }}>Đóng</Button>
							</div>
						</DialogActions>
					</Dialog>
					<Dialog
						open={dialogOpen}
						onClose={this.handleCloseDialog}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogContent style={{background:"#232936"}}>
							<div style={{width:"100%"}}>
								<div className="infoTitle">
									<div className="takeTurn">
										<span>Mua lượt chơi</span>
									</div>
									<div className="valueUser">
										<span className="global-thit" style={{color:"#fff"}}>Còn &nbsp;&nbsp;<img alt="just alt"src="../Xu.png" /> <span style={{ color: "#fff" }} >0 Xu</span >&nbsp;&nbsp; 0 lượt quay</span>
									</div>
								</div>
								<div>
									<div className="optionLeft">
										<div style={{background:"#2b303b", borderRadius:"10px", height:"70px", marginBottom:"15px", cursor:"pointer", border:(this.state.intValue === 1)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(1)}>
											<div style={{color:"#fff", padding:"5px 10px"}}>1 lượt</div>
											<div style={{color:"#fff", padding:"5px 10px", textAlign:"right"}}><span className="global-thit"><img alt="just alt" src="../Xu.png" /> <span style={{ color: "#fff" }} > 2,000 Thịt</span></span></div>
										</div>
										<div style={{background:"#2b303b", borderRadius:"10px", height:"70px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 5)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(5)}>
											<div style={{color:"#fff", padding:"5px 10px"}}>5 lượt</div>
											<div style={{color:"#fff", padding:"5px 10px", textAlign:"right"}}><span className="global-thit"><img alt="just alt" src="../Xu.png" /> <span style={{ color: "#fff" }} > 10,000 Thịt</span></span></div>
										</div>
										<div style={{background:"#2b303b", borderRadius:"10px", height:"70px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 10)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(10)}>
											<div style={{color:"#fff", padding:"5px 10px"}}>10 lượt</div>
											<div style={{color:"#fff", padding:"5px 10px", textAlign:"right"}}><span className="global-thit"><img alt="just alt" src="../Xu.png" /> <span style={{ color: "#fff" }} > 20,000 Thịt</span></span></div>
										</div>
									</div>
									<div className="optionRight">
										<div style={{background:"#2b303b", borderRadius:"10px", height:"70px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 20)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(20)}>
											<div style={{color:"#fff", padding:"5px 10px"}}>20 lượt</div>
											<div style={{color:"#fff", padding:"5px 10px", textAlign:"right"}}><span className="global-thit"><img alt="just alt" src="../Xu.png" /> <span style={{ color: "#fff" }} > 40,000 Thịt</span></span></div>
										</div>
										<div style={{background:"#2b303b", borderRadius:"10px", height:"70px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 50)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(50)}>
											<div style={{color:"#fff", padding:"5px 10px"}}>50 lượt</div>
											<div style={{color:"#fff", padding:"5px 10px", textAlign:"right"}}><span className="global-thit"><img alt="just alt" src="../Xu.png" /> <span style={{ color: "#fff" }} > 100,000 Thịt</span></span></div>
										</div>
										<div style={{background:"#2b303b", borderRadius:"10px", height:"70px", marginBottom:"15px", cursor:"pointer",  border:(this.state.intValue === 100)?this.state.whenSelect:""}} onClick={()=>this.selectPackage(100)}>
											<div style={{color:"#fff", padding:"5px 10px"}}>100 lượt</div>
											<div style={{color:"#fff", padding:"5px 10px", textAlign:"right"}}><span className="global-thit"><img alt="just alt" src="../Xu.png" /> <span style={{ color: "#fff" }} > 200,000 Thịt</span></span></div>
										</div>
									</div>
								</div>
							</div>
							<div className="action">
							
								<button className="closeBuy" onClick={this.handleCloseDialog}>
									ĐÓNG
								</button>
								<button className="buy" onClick={() => this.buyTurn()}>
									MUA
								</button>
							</div>
						</DialogContent>
					</Dialog>
					<Dialog
						open={dialogItemOpen}
						onClose={this.handleCloseDialogItem}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogTitle id="responsive-dialog-title"><span>Bảng xếp hạng</span></DialogTitle>
						<AppBar
							style={{ background: "transparent", boxShadow: "none", color: "#fff" }}
							position="static">
							<Toolbar style={{ display: "block", minHeight: "auto", padding: "5px", margin: "0px", background: "transparent" }}>
								<Tabs value={this.state.value} onChange={this.handleChange}>
									<Tab label="LẬT THẺ" />
									<Tab label="ĐẤU GIÁ" />
								</Tabs>
							</Toolbar>
						</AppBar>
						<DialogContent style={{ color: "#fff" }}>
							<div>
								<Table style={{minWidth: "500px"}}>
									<TableHead>
										<TableRow>
											<TableCell>Tên vật phẩm</TableCell>
											<TableCell>Tên sự kiện</TableCell>
											<TableCell>Tên người nhận</TableCell>
											<TableCell>Thời gian</TableCell>
										</TableRow>
									</TableHead>
									{/* <TableBody>
									{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
										return (
										<TableRow key={row.id}>
											<TableCell>{row.itemName}</TableCell>
											<TableCell>{row.eventName}</TableCell>
											<TableCell>{row.userName}</TableCell>
											<TableCell>{row.receiveTime}</TableCell>
										</TableRow>
										);
									})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 48 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TablePagination
												colSpan={3}
												count={rows.length}
												rowsPerPage={rowsPerPage}
												page={page}
												rowsPerPageOptions={rowsPerPageOptions}
												onChangePage={this.handleChangePage}
												onChangeRowsPerPage={this.handleChangeRowsPerPage}
												ActionsComponent={TablePaginationActionsWrapped}
											/>
										</TableRow>
									</TableFooter> */}
								</Table>
							</div>
						</DialogContent>
						<DialogActions>
							<div>
								<Button onClick={this.handleCloseDialogItem} style={{ color: "#888787", borderRadius:"20px" }}>Đóng</Button>
							</div>
						</DialogActions>
					</Dialog>
					{/* <LoginRequired open={dialogLoginOpen}></LoginRequired> */}
					<Notification message={message} variant={snackVariant} openSnack={openSnack} closeSnackHandle={this.handleCloseSnack} ></Notification>
				</div>
			)
	}
}

export default connect()(MiniGameDetailComponent)
