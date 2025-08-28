import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceRecognition() {
  const videoRef = useRef();
  const [pending, setPending] = useState(false);

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
    if (pending) return; // prevent duplicate scans
    setPending(true);

    try {
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

        console.log("highest mood -->", highestExpression, "mood -->", Maxmood);
      }
    } catch (error) {
      setTimeout(() => {
        detectMood();
      }, 500);
    } finally {
      setPending(false); // always reset after detection (success or error)
    }
  };

  return (
    <div className="relative">
      <video ref={videoRef} autoPlay muted width="400" height="300" />
    
      <button
        onClick={detectMood}
        disabled={pending}
        className="mt-5 text-white rounded text-2xl px-4 py-2 bg-gray-600 active:scale-95"
      >
        {pending ? "Scanning Your Face..." : "Scan Expression"}
      </button>
    </div>
  );
}
