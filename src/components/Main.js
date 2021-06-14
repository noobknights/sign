import React from "react";
import Webcam from "react-webcam";
import { ExitToApp } from "@material-ui/icons";
import {
	makeStyles,
	AppBar,
	Toolbar,
	IconButton,
	Grid,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		height: "100%",
		display: "flex",
	},
	logo: {
		maxHeight: "50px",
		maxWidth: "50px",
	},
	appbar: {
		backgroundColor: "transparent",
		boxShadow: "none",
	},
	exitButton: {
		color: "red",
	},
	videoArea: {
		height: "100%",
		width: "100%",
	},
}));

export default function Home() {
	const classes = useStyles();
	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};
	const openHome = () => {
		window.location = "./";
	};

	return (
		<div className={classes.root}>
			<AppBar position="absolute" className={classes.appbar}>
				<Toolbar>
					<Grid justify="space-between" container>
						<Grid item>
							<IconButton
								onClick={openHome}
								edge="start"
								title="Home"
								color="inherit"
							>
								<img
									alt="logo"
									className={classes.logo}
									src={"./favicon.png"}
								></img>
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton
								onClick={openHome}
								edge="end"
								title="Exit"
							>
								<ExitToApp
									className={classes.exitButton}
									fontSize="large"
								/>
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			<Webcam
				className={classes.videoArea}
				videoConstraints={videoConstraints}
			/>
		</div>
	);
}
