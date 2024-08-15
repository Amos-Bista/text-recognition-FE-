import React, { useState, useEffect, useRef } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material"; // Import CircularProgress
import Button from "@mui/material/Button";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

function Video() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null); // Create a ref for the video element

  const startCamera = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/start-camera`);
      if (response.data.status !== "success") {
        throw new Error(response.data.message || "Failed to start camera");
      }
      setVideoSrc(`${API_URL}/video-feed`);
    } catch (error) {
      setError(<div>{error.message || "An error occurred"}</div>);
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/close-camera`);
      if (response.data.status !== "success") {
        throw new Error(response.data.message || "Failed to stop camera");
      }
      setVideoSrc(null);
    } catch (error) {
      setError(<div>{error.message || "An error occurred"}</div>);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen(); // Request fullscreen when the video plays
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full pt-12 align-middle bg-red-200">
      <Stack spacing={2}>
        <Typography>Press Button to Open Camera</Typography>
        <Button onClick={startCamera} disabled={loading}>
          {loading ? "Starting Camera..." : "Start Camera"}
        </Button>
        <Button onClick={stopCamera} disabled={loading}>
          {loading ? "Stopping Camera..." : "Stop Camera"}
        </Button>
        {loading && <CircularProgress />} {/* Loading Spinner */}
        {error && <Typography color="error">{error}</Typography>}
        {videoSrc && (
          <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Typography>Video Feed:</Typography>
            <video
              ref={videoRef} // Set the ref to the video element
              src={videoSrc}
              autoPlay
              controls
              onPlay={handleVideoPlay} // Call the function on play
              style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                objectFit: "cover" // Ensure the video covers the full area
              }}
            />
          </div>
        )}
      </Stack>
    </div>
  );
}

export default Video;
