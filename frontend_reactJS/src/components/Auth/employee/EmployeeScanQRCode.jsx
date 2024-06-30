import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';
import { qrCodeAttendance } from '../../redux/actions/attendanceAction';

function EmployeeScanQRCode() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scannerActive, setScannerActive] = useState(true);
  const [scanResult, setScanResult] = useState(null);

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
              alert(qrcodeReqRes.message || "Attendance recorded successfully!");
            } else {
              throw new Error(qrcodeReqRes.message || "Failed to record attendance");
            }
            
          } catch (error) {
            console.error("QR Code Authentication Error:", error);
            alert(error.message || "An error occurred during authentication. Please try again.");
          } finally {
            // Re-enable the scanner after 15 seconds
            setTimeout(() => {
              setScannerActive(true);
              setScanResult(null);
            }, 15000);
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

  
  return (
    <div className="min-h-screen flex items-center justify-center">
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
                  <div className="mt-4 text-center text-green-600">
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
