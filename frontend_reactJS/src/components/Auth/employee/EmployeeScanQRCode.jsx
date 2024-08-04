import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';
import { qrCodeAttendance } from '../../redux/actions/attendanceAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeScanQRCode() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scannerActive, setScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const audioRefSuccess = useRef(new Audio('/patotoya.m4a'));
  const audioRefError = useRef(new Audio('/ganiharakaba.m4a'));

  const startScanner = () => {
    setScannerActive(true);
    console.log("Scanner started by user interaction.");
  };

  // Function to handle audio playback errors
  const handleAudioError = (audioRef, error) => {
    console.error(`Audio playback failed: ${error}`);
    // Handle error logging or other actions as needed
  };

  // Function to play error audio
  const playErrorAudio = () => {
    try {
      audioRefError.current.play();
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
  
            const qrcodeReqRes = await dispatch(qrCodeAttendance({ employee_email: email }));
            console.log("QR Code Attendance Result:", qrcodeReqRes);
  
            if (qrcodeReqRes && qrcodeReqRes.success) {
              toast.success(qrcodeReqRes.message || 'Attendance recorded successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                  background: 'black',
                  color: '#A3E636',
                  fontSize: '17px',
                },
              });
  
              // Play success audio
              setTimeout(() => {
                try {
                  audioRefSuccess.current.play();
                } catch (error) {
                  handleAudioError(audioRefSuccess.current, error);
                }
              }, 1000);
  
            } else {
              // Play error audio for any unsuccessful response
              playErrorAudio();
  
              toast.error(qrcodeReqRes ? qrcodeReqRes.message : 'Unknown error occurred', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                  background: 'black',
                  color: 'red',
                  fontSize: '15px',
                  fontWeight: 'Bold',
                },
              });
            }
          } catch (error) {
            console.error('QR Code Authentication Error:', error);
  
            // Play error audio for any error
            playErrorAudio();
  
            toast.error(error.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                background: 'black',
                color: 'red',
                fontSize: '15px',
                fontWeight: 'Bold',
              },
            });
          } finally {
            // Re-enable the scanner after 3 seconds
            setTimeout(() => {
              setScannerActive(true);
              setScanResult(null);
            }, 3000);
          }
        }
      });
  
      scanner.start().then(() => {
        console.log("QR Scanner started");
      }).catch(error => {
        console.error("Failed to start QR Scanner:", error);
        alert("Failed to start QR Scanner. Please check your camera permissions.");
        playErrorAudio(); // Play error audio if scanner fails to start
      });
    };
  
    if (scannerActive) {
      setupScanner();
    }
  
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
          <div className="artboard artboard-demo phone-1">
            <div className="card-body">
              <div className="form-control">
                <label className='text-2xl text-center py-4 my-4'>
                  SCAN QR CODE<br />
                  FOR ATTENDANCE
                </label>
                <video
                  className="box-content h-64 w-64 border-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ objectFit: 'cover' }}
                />
                {scanResult && (
                  <div className="mt-4 text-lg text-center text-white">
                    Scan successful! Please wait for 3 seconds before scanning again.
                  </div>
                )}
              </div>
              {!scannerActive && (
                <div className='flex justify-center'>
                  <button
                    onClick={startScanner}
                    className="m-4 p-2  bg-indigo-500  rounded"
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