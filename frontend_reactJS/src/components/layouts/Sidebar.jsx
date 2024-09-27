/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { BsQrCodeScan } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { TiUserAddOutline } from "react-icons/ti";
import { FaUserTie } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { FaRunning } from "react-icons/fa";
import { FcDoughnutChart, FcOpenedFolder, FcHome, FcTimeline, FcMenu, FcExpired, FcCurrencyExchange, FcButtingIn, FcStatistics, FcManager, FcElectricalThreshold, FcComboChart, FcList, FcSettings, FcConferenceCall, FcReuse, FcDepartment, FcMoneyTransfer, FcOvertime, FcDebt, FcPortraitMode, FcSalesPerformance } from "react-icons/fc";
//LAYOUTS
// EDIT MARCO GWAPO
const SideBar = ({ isAuthenticatedUser }) => {

  return (
    <div className="drawer-side border-r-4 bg-white drop-shadow-lg">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-0">
            <li>
              <details close>
                <summary className='glass'>
                  <FcTimeline
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                    }}
                  />
                  <span className='text-2xl'>
                    MAIN
                  </span>
                </summary>
                <ul>
                  <li>
                    <Link to="/" className='text-2xl glass'>
                      <FcComboChart
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <span className='text-lg'>
                        ANALYTICS&MONITORING
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/attendance" className='text-2xl glass'>
                      <FcStatistics
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <span className='text-lg'>
                        ATTENDANCE LIST
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/dashboard" className='text-2xl glass'>
                      <FcButtingIn
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <span className='text-lg'>
                        EMPLOYEES LIST
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/archieve" className='text-2xl glass'>
                      <FcReuse
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <span className='text-lg'>
                        EMPLOYEES ARCHIEVE
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/departments" className='text-2xl glass'>
                      <FcDepartment
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <span className='text-lg'>
                        DEPARTMENTS
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/payrolls" className='text-2xl glass'>
                      <FcCurrencyExchange
                        style={{
                          height: "2rem",
                          width: "2rem",
                        }}
                      />
                      <span className='text-lg'>
                        PAYROLLS
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/rates" className='text-2xl glass'>
                      <FcSalesPerformance
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-lg'>
                        RATES
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/overtimes" className='text-2xl glass'>
                      <FcOvertime
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-lg'>
                        OVERTIMES
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/deductions" className='text-2xl glass'>
                      <FcExpired
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-lg'>
                        DEDUCTIONS
                      </span>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/dashboard" className='text-2xl glass'>
                <FcDoughnutChart
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                DASHBOARD
              </Link>
            </li>
            <li>
              <Link to="/employee/attendance" className='text-2xl glass'>
                <FcElectricalThreshold
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                ATTENDANCE
              </Link>
            </li>
            <li>
              <Link to="/employee/dashboard" className='text-2xl glass'>
                <FcConferenceCall
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                EMPLOYEES
              </Link>
            </li>
            <li>
              <Link to="/employee/archieve" className='text-2xl glass'>
                <FcReuse
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                EMPLOYEES ARCH.
              </Link>
            </li>
            <li>
              <Link to="/admin/departments" className='text-2xl glass'>
                <FcDepartment
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                DEPARTMENTS
              </Link>
            </li>
            <li>
              <Link to="/admin/payrolls" className='text-2xl glass'>
                <FcMoneyTransfer
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                PAYROLLS
              </Link>
            </li>
            <li>
              <Link to="/admin/rates" className='text-2xl glass'>
                <FcSalesPerformance
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                RATES
              </Link>
            </li>
            <li>
              <Link to="/admin/overtimes" className='text-2xl glass'>
                <FcOvertime
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                OVERTIMES
              </Link>
            </li>
            <li>
              <Link to="/admin/deductions" className='text-2xl glass'>
                <FcDebt
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                />
                DEDUCTIONS
              </Link>
            </li>
            <li>
              <details close>
                <summary>
                  <FcSettings
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                    }}
                  />
                  <span className='text-2xl'>
                    MANAGE USERS
                  </span>
                </summary>
                <ul>
                  <li>
                    <a>
                      <FcManager
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-2xl'>
                        USER
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <FcList
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-2xl'>
                        USER LIST
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <FcList
                        style={{
                          height: "2.5rem",
                          width: "2.5rem",
                        }}
                      />
                      <span className='text-2xl'>
                        USERS TYPE
                      </span>
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default SideBar;