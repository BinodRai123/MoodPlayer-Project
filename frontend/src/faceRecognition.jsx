import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FaceRecognition({setSongs}) {
  const videoRef = useRef();

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");

      startVideo();
    }

    function startVideo() {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    }

    loadModels();
  }, []);

  const detectMood = async () => {
    
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detections.length) {
        console.log("No face detected");
      } else {
        const expressions = detections[0].expressions;
        let highestExpression = 0;
        let Maxmood = "";

        for (let key in expressions) {
          if (expressions[key] > highestExpression) {
            highestExpression = expressions[key];
            Maxmood = key;
          }
        }
        
        const {data} = await axios.get(`http://localhost:3000/songs?mood=${Maxmood}`);
        setSongs(data.songs)
        console.log(Maxmood)
      }
    
  };

  return (
    <div className="relative">
      <video ref={videoRef} autoPlay muted width="400" height="300" />
    
      <button
        onClick={detectMood}
        className="mt-5 text-white rounded text-2xl px-4 py-2 bg-gray-600 active:scale-95"
      >
      Scan Expression
      </button>
    </div>
  );
}
