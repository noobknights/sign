import React, { useState } from "react";
import Webcam from "react-webcam";
import { ExitToApp, CameraRear, CameraFront } from "@material-ui/icons";
import {
	makeStyles,
	AppBar,
	Toolbar,
	IconButton,
	Grid,
	Fab,
	Zoom,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		height: "100%",
		display: "flex",
	},
	logo: {
		maxHeight: "35px",
		maxWidth: "35px",
	},
	appbar: {
		backgroundColor: "transparent",
		boxShadow: "none",
	},
	exitButton: {
		color: "red",
	},
	videoArea: {
		objectFit: "cover",
		height: "100%",
		width: "100%",
	},
	cameraMode: { position: "absolute", right: 15, bottom: 15, zIndex: 1 },
}));

export default function Home() {
	const classes = useStyles();
	const [mode, setCameraMode] = useState("user");
	const [zoom, setZoom] = useState(true);

	const videoConstraints = {
		width: window.innerWidth,
		height: window.innerHeight,
		facingMode: mode,
	};

	const cameraModeChange = () => {
		if (mode === "user") setCameraMode("environment");
		else setCameraMode("user");
		setZoom(false);
		setTimeout(function () {
			setZoom(true);
		}, 100);
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
			<Zoom in={zoom}>
				<Fab className={classes.cameraMode} onClick={cameraModeChange}>
					{mode === "environment" && <CameraFront></CameraFront>}
					{mode === "user" && <CameraRear></CameraRear>}
				</Fab>
			</Zoom>
			<Webcam
				audio={false}
				className={classes.videoArea}
				videoConstraints={videoConstraints}
				width={videoConstraints.width}
				height={videoConstraints.height}
			/>
		</div>
	);
}
