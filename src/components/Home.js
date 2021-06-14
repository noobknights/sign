import React from "react";
import Button from "@material-ui/core/Button";
import { PlayArrow } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	introCont: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		height: "100%",
	},
	logo: {
		maxHeight: "200px",
		maxWidth: "200px",
	},
	para: {
		maxWidth: "450px",
	},
	button: {
		margin: theme.spacing(1),
	},
}));

export default function Home() {
	const classes = useStyles();

	const openMain = () => {
		window.location = "./main";
	};

	return (
		<div className={classes.introCont}>
			<img
				className={classes.logo}
				alt="logo"
				src={"./logo512.png"}
			></img>
			<h1>Sign</h1>
			<p className={classes.para}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
				illo dicta. Ullam placeat natus consectetur magni illo. Iusto
				quo aspernatur minus velit, hic corporis minima autem earum
				aperiam ipsum officia nobis cumque. Aperiam dolorum enim vitae
				ut autem perferendis voluptas quo est praesentium similique aut
				repudiandae, sequi fugiat reprehenderit inventore!
			</p>
			<Button
				onClick={openMain}
				variant="contained"
				size="large"
				color="secondary"
				className={classes.button}
				startIcon={<PlayArrow />}
			>
				Start
			</Button>
		</div>
	);
}
