import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import { Link } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import RightArea from '../../components/RightArea'
import HeadMenu from '../HeadMenu'
import '../../styles/imageServerError.css'



class MiniGameComponent extends React.Component {
    nextGameDetail=(game)=>{
        if (typeof(Storage) !== "undefined") {
			localStorage.setItem("game", game);
		} else {
			console.log("Trình duyệt không hỗ trợ localStorage");
		}
    }

	render() {
        var listGame=["snake","tetris","flappy bird","pacman", "racing monster"]
		const {data, waiting,server}=this.props;
		return (
				<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
					<HeadMenu></HeadMenu>
					<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
						<Grid item xs={12} md={8}>
							<Grid container style={{ width: "100%", margin: "0" }} spacing={8} justify="center">
								<Grid item xs={12}>
                                {listGame.map((obj,key)=>(
                                   <Link to={"./mini-game-detail"} >
                                        <div key={key} style={{color:"#fff", cursor:"pointer"}} onClick={()=>this.nextGameDetail(listGame[key])}>{obj}</div>
                                    </Link>
                                ))}
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
				</div>
			)
	}
}

export default connect()(MiniGameComponent)
