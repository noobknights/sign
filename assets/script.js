let startBtn = document.getElementById("start-btn");
let startMenu = document.getElementById("start");
let mainBtn = document.getElementById("main-btn");
let mainMenu = document.getElementById("main");
let closeBtn = document.getElementById("close-btn");
let webCont = document.getElementById("webcam");
let messageArea = document.getElementById("message");
let webCam, model, labelContainer, maxPredictions;
let myReq;

const URL = "https://teachablemachine.withgoogle.com/models/edFYYTiEA/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

startBtn.onclick = async () => {
	console.log("startBtn");
	startMenu.style.display = "none";
	mainMenu.style.display = "flex";
	await modelLoad();
};

mainBtn.onclick = async (e) => {
	var target = JSON.parse(e.target.value);
	console.log("mainBtn");
	await buttonSwap(target);
	console.log(webCam);
	e.target.value = JSON.stringify(!target);
};

closeBtn.onclick = async () => {
	console.log("closeBtn");
	await webCam.stop();
	await webCam.pause();
	cancelAnimationFrame(myReq);
	mainMenu.style.display = "none";
	startMenu.style.display = "flex";
};

async function loop() {
	webCam.update(); // update the webcam frame
	await predict();
	myReq = window.requestAnimationFrame(loop);
}

async function predict() {
	// predict can take in an image, video or canvas html element
	const prediction = await model.predict(webCam.canvas);
	prediction.sort((a, b) => {
		return a.probability < b.probability;
	});
	messageArea.innerHTML = `<h3>${
		prediction[0].className
	} => ${prediction[0].probability.toFixed(2)}</h3>`;
}

async function resizeCanvas() {
	cancelAnimationFrame(myReq);
	await webCam.pause();
	mainBtn.classList.remove("btn-danger");
	mainBtn.classList.add("btn-success");
	mainBtn.innerHTML = '<i class="bi bi-play"></i> Start';
	mainBtn.value = "true";
	await modelLoad();
	mainBtn.classList.remove("btn-success");
	mainBtn.classList.add("btn-danger");
	mainBtn.innerHTML = '<i class="bi bi-pause"></i> Stop';
	mainBtn.value = "false";
}

async function modelLoad() {
	model = await tmImage.load(modelURL, metadataURL);
	maxPredictions = model.getTotalClasses();
	webCam = new tmImage.Webcam(window.innerWidth, window.innerHeight, true); // width, height, flip
	console.log(webCam);
	await webCam.setup();
	await webCam.play();
	myReq = window.requestAnimationFrame(loop);
	if (webCont.childNodes[0]) {
		webCont.removeChild(webCont.childNodes[0]);
	}
	webCont.appendChild(webCam.canvas);
}

async function buttonSwap(target) {
	if (!target) {
		await webCam.pause();
		mainBtn.classList.remove("btn-danger");
		mainBtn.classList.add("btn-success");
		mainBtn.innerHTML = '<i class="bi bi-play"></i> Start';
	} else {
		await webCam.play();
		mainBtn.classList.remove("btn-success");
		mainBtn.classList.add("btn-danger");
		mainBtn.innerHTML = '<i class="bi bi-pause"></i> Stop';
	}
}
