import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// QR Code Reader
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';
// Redux
import { qrCodeAttendance } from '../../redux/actions/attendanceAction';
// Toaster
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeScanQRCode() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scannerActive, setScannerActive] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const audioRef = useRef(new Audio('/frontend_reactJS/public/Recording.m4a')); // Adjust the path to your audio file

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

            // Dispatch the action with the email
            const qrcodeReqRes = await dispatch(qrCodeAttendance({ employee_email: email }));
            console.log("QR Code Attendance Result:", qrcodeReqRes);

            if (qrcodeReqRes.success) {
              toast.success(qrcodeReqRes.message || 'Attendance recorded successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                  background: 'black',
                  color: '#A3E636',
                  fontSize: '17px',
                },
              });
            } else {
              throw new Error(qrcodeReqRes.message || 'Failed to record attendance');
            }
          } catch (error) {
            console.error('QR Code Authentication Error:', error);
            toast.error(error.message || 'An error occurred during authentication. Please try again.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              style: {
                background: 'black',
                color: 'red',
                fontSize: '15px',
                fontWeight: 'Bold',
              },
            });
          } finally {
            // Re-enable the scanner after 15 seconds
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
      });
    };

    setupScanner();

    return () => {
      if (scanner) {
        scanner.destroy();
        console.log("QR Scanner stopped");
      }
    };
  }, [dispatch, scannerActive]);

  // Use useEffect to play audio when scanResult is updated
  useEffect(() => {
    if (scanResult) {
      audioRef.current.play();
    }
  }, [scanResult]);

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
                    Scan successful! Please wait for 15 seconds before scanning again.
                  </div>
                )}
              </div>
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
