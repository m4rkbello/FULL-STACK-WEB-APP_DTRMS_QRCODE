/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';
import { qrCodeAttendance } from '../../redux/actions/attendanceAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeScanQRCode() {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [scannerActive, setScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  //memes
  const audioRefSuccess = useRef(new Audio('/patotoya.m4a'));
  const audioRefError = useRef(new Audio('/ganiharakaba.m4a'));
  const audioRefOhaha = useRef(new Audio('/ohaha.m4a'));

  const startScanner = () => {
    setScannerActive(true);
    console.log("Scanner started by user interaction.");
  };

  const handleAudioError = (audioRef, error) => {
    console.error(`Audio playback failed: ${error}`);
  };

  //PATOTOYA HAHA
  const playSuccessAudio = () => {
    try {
      audioRefSuccess.current.play();
    } catch (error) {
      handleAudioError(audioRefSuccess.current, error);
    }
  };

  //GANIHA RAKA BA!
  const playErrorAudio = () => {
    try {
      audioRefError.current.play();
    } catch (error) {
      handleAudioError(audioRefError.current, error);
    }
  };

  //OHAHA AUDIO
  const playDuplicateAudio = () => {
    try {
      audioRefOhaha.current.play();
    } catch (error) {
      handleAudioError(audioRefError.current, error);
    }
  };


  useEffect(() => {
    let scanner;

    const setupScanner = () => {
      scanner = new QrScanner(videoRef.current, async (result) => {
        if (scannerActive) {
          console.log("QR Code detected:", result);
          setScanResult(result);
          setScannerActive(false);

          try {
            const email = result;
            console.log("Email extracted from QR code:", email);

            // Dispatch the Redux action and wait for the response
            const response = await dispatch(qrCodeAttendance({ employee_email: email }));

            // Log the response keys and the response itself
            console.log("Response Data Keys:", Object.keys(response));
            console.log("Full Response Data:", response);

            // Handle success and error based on the response data
            if (response.success === true && response.status === 200) {
              playSuccessAudio();
            } else if (response.success === false && response.status === 406) {
              playDuplicateAudio();
            } else {
              playErrorAudio();
            }

          } catch (error) {
            console.error('QR Code Authentication Error:', error);

            // Log the keys of the error object
            console.error('Error object keys:', Object.keys(error));

            // If the error has a response property (typical for axios errors)
            if (error.response) {
              console.error('Error response data keys:', Object.keys(error.response.data));
              console.error('Error response status:', error.response.status);
              console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('Error request:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error message:', error.message);
            }

            playErrorAudio();
          } finally {
            // Reactivate the scanner after a short delay
            setTimeout(() => {
              setScannerActive(true);
              setScanResult(null);
            }, 3000);
          }
        }
      });

      // Start the QR scanner
      scanner.start().then(() => {
        console.log("QR Scanner started");
      }).catch(error => {
        console.error("Failed to start QR Scanner:", error);
        alert("Failed to start QR Scanner. Please check your camera permissions.");
        playErrorAudio();
      });
    };

    // Set up the scanner if it's active
    if (scannerActive) {
      setupScanner();
    }

    // Clean up the scanner on component unmount
    return () => {
      if (scanner) {
        scanner.destroy();
        console.log("QR Scanner stopped");
      }
    };
  }, [dispatch, scannerActive]);

  return (
    <div className="min-h-screen flex items-center justify-center">
    <ToastContainer />
    <div className="mockup-phone border-primary">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard artboard-demo glass phone-1">
          <div className="card-body">
            <div className="form-control">
              <label className='text-2xl text-center py-4 my-4'>
                <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 z-50 my-5 flex justify-center">
                  <img
                    src="https://i.ibb.co/7JHVynR/DTRMS-LOGO-removebg-preview.png"
                    alt="DTRMS Logo"
                    className="h-auto w-auto sm:w-2/3 md:w-2/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 object-contain"
                  />
                </div>
              </label>
              <video
                className="box-content my-10 h-64 w-64 border-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ objectFit: 'cover' }}
              />
              {scanResult && (
                <div className="mt-2 text-lg text-center text-white">
                  Scan successful! Please wait for 3 seconds before scanning again.
                </div>
              )}
            </div>
            {!scannerActive && (
              <div className='flex justify-center'>
                <button
                  onClick={startScanner}
                  className="m-4 p-2 bg-indigo-500 rounded"
                  style={{ zIndex: 10 }}
                >
                  Start Scanner
                </button>
              </div>
            )}
            <div className='flex justify-center'>
              <label className="text-2xl mx-2">
                <Link to="/admin/login" className="label-text-alt link link-hover">
                  Login instead?
                </Link>
              </label>
              <label className="text-3xl mx-2">
                <Link to="/admin/register" className="label-text-alt link link-hover">
                  Create an Account?
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default EmployeeScanQRCode;