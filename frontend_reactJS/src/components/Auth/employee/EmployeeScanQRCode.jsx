import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min.js';

function EmployeeScanQRCode() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [debouncedScan, setDebouncedScan] = useState(null);

  useEffect(() => {
    const scanner = new QrScanner(videoRef.current, async (email) => {
      try {
        // Update the debounced scan function
        setDebouncedScan(() => {
          return async () => {
            try {
              // Actual fetch request
              const response = await fetch('http://127.0.0.1:8000/api/scan-qrcode', {
                method: 'POST',
                body: JSON.stringify({ email }),
              });

              if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
              }

              const data = await response.json();

              // Handle successful response (e.g., login user, redirect)
              console.log("QR Code Authentication Successful:", data);
              navigate('/dashboard'); // Replace with your desired redirect
            } catch (error) {
              // Handle errors (e.g., display error messages)
              console.error("QR Code Authentication Error:", error);
              // Display error message to user
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
        // Display error message to user
        alert("QR Code Scanner encountered an error. Please try again or check your camera permissions.");
      }
    });

    scanner.start();

    return () => {
      scanner.stop(); // Use `stop` instead of `destroy` to stop the scanner
    };
  }, [debouncedScan, navigate]);

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
