import React from 'react'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import Hidden from 'material-ui/Hidden'
import RightArea from '../../components/RightArea'
import HeadMenu from '../../components/HeadMenu';
import '../../styles/imageServerError.css'



class TestGame extends React.Component {

    componentDidMount(){
        var user = JSON.parse(localStorage.getItem("user"));
        if (user !== null) {
            console.log('USER:', user);
            document.getElementById("myIframe").src = 'http://103.252.253.87:8000/?' + user;
        }
    }

	render() {
		return (
			<div style={{ marginTop: "8px", marginBottom: "5px", borderRadius: "5px", padding: "5px" }}>
				<HeadMenu></HeadMenu>
				<Grid container style={{ width: "100%", margin: "0" }} spacing={8}>
					<Grid item xs={12} md={8}>
                        <iframe id="myIframe" src="http://103.252.253.87:8000/?" width="400" height="400" ></iframe>
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

export default connect()(TestGame)
