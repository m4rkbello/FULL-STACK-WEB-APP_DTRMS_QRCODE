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
  const [debouncedScan, setDebouncedScan] = useState(null);

  useEffect(() => {
    const scanner = new QrScanner(videoRef.current, async (result) => {
      try {
        // Update the debounced scan function
        setDebouncedScan(() => {
          return async () => {
            try {
              const email = result.data; // Assuming the QR code contains the email
              // Dispatch the Redux action
              await dispatch(qrCodeAttendance(email));

              // Navigate to the dashboard or handle the successful response
              navigate('/dashboard'); // Replace with your desired redirect
            } catch (error) {
              console.error("QR Code Authentication Error:", error);
              alert("An error occurred during authentication. Please try again.");
            }
          };
        });

        // Call the debounced function after 500 milliseconds
        setTimeout(() => {
          if (debouncedScan) {
            debouncedScan();
          }
        }, 500);
      } catch (error) {
        console.error("QR Code Scanner Error:", error);
        alert("QR Code Scanner encountered an error. Please try again or check your camera permissions.");
      }
    });

    scanner.start();

    return () => {
      scanner.stop();
    };
  }, [debouncedScan, dispatch, navigate]);

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
