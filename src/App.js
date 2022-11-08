import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeNEnIkBp69KtRx3wE6pzA-PnYWjPPLxk",
  authDomain: "webrtc-aa96f.firebaseapp.com",
  projectId: "webrtc-aa96f",
  storageBucket: "webrtc-aa96f.appspot.com",
  messagingSenderId: "1080578656305",
  appId: "1:1080578656305:web:85309e3a06217747076d10",
  measurementId: "G-SKY7HDM5NJ"
};

const servers= {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}
let pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

const webCam = document.getElementById('webCam');
const remoteCam = document.getElementById('remoteCam');

const startWebCam = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
  remoteStream = new MediaStream();

  localStream.getTracks().forEach(track => {
    pc.addTrack(track, localStream);
  });

  pc.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    });
  };

  webCam.srcObject = localStream;
  remoteCam.srcObject = remoteStream;

}

function App() {
  return (
    <div className="App">
      <video id="webCam"></video>
      <video id="remoteCam"></video>
      <button onClick={startWebCam}>Start webcam</button>
    </div>
  );
}

export default App;
