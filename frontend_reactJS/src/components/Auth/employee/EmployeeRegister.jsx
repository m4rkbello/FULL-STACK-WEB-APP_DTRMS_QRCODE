/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerEmployee } from '../../redux/actions/employeeAction';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import phil from 'phil-reg-prov-mun-brgy';
import { regions, provinces, city_mun, barangays} from 'phil-reg-prov-mun-brgy'

const EmployeeRegister = ({ registerEmployee }) => {

    // console.log(regions());
    console.log(regions());
    // console.log(cities());
    // console.log(barangays());

    const [localFirstName, setLocalFirstName] = useState("");
    const [localLastName, setLocalLastName] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    const [localContactNo, setLocalContactNo] = useState("");
    const [localPassword, setLocalPassword] = useState("");
    const [localConfirmPassword, setLocalConfirmPassword] = useState("");

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedMunicipality, setSelectedMunicipality] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const [regionList, setRegionList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [municipalityList, setMunicipalityList] = useState([]);
    const [barangayList, setBarangayList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Load all regions on component mount
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const regionsList = await regions();
                setRegionList(regionsList);
            } catch (error) {
                console.error("Error fetching regions:", error);
            }
        };
        fetchRegions();
    }, []);

    // Load provinces when a region is selected
    useEffect(() => {
        const fetchProvinces = async () => {
            if (selectedRegion) {
                try {
                    const provincesList = await provinces(selectedRegion);
                    setProvinceList(provincesList);
                } catch (error) {
                    console.error("Error fetching provinces:", error);
                }
            } else {
                setProvinceList([]);
            }
        };
        fetchProvinces();
    }, [selectedRegion]);

    // Load municipalities when a province is selected
    useEffect(() => {
        const fetchMunicipalities = async () => {
            if (selectedProvince) {
                try {
                    const municipalitiesList = await city_mun(selectedProvince);
                    setMunicipalityList(municipalitiesList);
                } catch (error) {
                    console.error("Error fetching municipalities:", error);
                }
            } else {
                setMunicipalityList([]);
            }
        };
        fetchMunicipalities();
    }, [selectedProvince]);

// Load barangays when a municipality is selected
useEffect(() => {
    const fetchBarangays = async () => {
        if (selectedMunicipality) {
            try {
                const barangaysList = await barangays(selectedMunicipality);
                setBarangayList(barangaysList);
            } catch (error) {
                console.error("Error fetching barangays:", error);
            }
        } else {
            setBarangayList([]); // Move this to else block
        }
    };
    fetchBarangays();
}, [selectedMunicipality]);


    const handleRegisterUserRequestAndResponse = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        if (localPassword !== localConfirmPassword) {
            setError("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            await registerEmployee({
                employee_firstname: localFirstName,
                employee_lastname: localLastName,
                employee_email: localEmail,
                employee_contact_no: localContactNo,
                employee_password: localPassword,
                password_confirmation: localConfirmPassword,
                employee_barangay: selectedBarangay,
                employee_municipality: selectedMunicipality,
                employee_province: selectedProvince,
                employee_region: selectedRegion,
            });
            navigate('/success');
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message || "Registration failed, please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full"> {/* Full-width div container */}
            <div className="grid grid-cols-3 divide-x bg-black">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="min-h-screen flex items-center justify-center">
                <ToastContainer />
                <div className="artboard phone-2 flex flex-col items-center justify-center w-full max-w-screen-xl mx-4">
                    <div className="card w-full max-w-5xl shadow-md bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 border-t-4 border-b-4 border-black">
                        <form className="card-body" onSubmit={handleRegisterUserRequestAndResponse}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Region Dropdown */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl text-black">Region</span>
                                    </label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                        className="input input-bordered glass"
                                    >
                                        <option value="">Select Region</option>
                                        {regionList.map((region) => (
                                            <option key={region.id} value={region.id}>
                                                {region.region_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Province Dropdown */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl text-black">Province</span>
                                    </label>
                                    <select
                                        value={selectedProvince}
                                        onChange={(e) => setSelectedProvince(e.target.value)}
                                        className="input input-bordered glass"
                                        disabled={!selectedRegion}
                                    >
                                        <option value="">Select Province</option>
                                        {provinceList.map((province) => (
                                            <option key={province.prv_code} value={province.prv_code}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Municipality Dropdown */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl text-black">Municipality</span>
                                    </label>
                                    <select
                                        value={selectedMunicipality}
                                        onChange={(e) => setSelectedMunicipality(e.target.value)}
                                        className="input input-bordered glass"
                                        disabled={!selectedProvince}
                                    >
                                        <option value="">Select Municipality</option>
                                        {municipalityList.map((municipality) => (
                                            <option key={municipality.mun_code} value={municipality.mun_code}>
                                                {municipality.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Barangay Dropdown */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl text-black">Barangay</span>
                                    </label>
                                    <select
                                        value={selectedBarangay}
                                        onChange={(e) => setSelectedBarangay(e.target.value)}
                                        className="input input-bordered glass"
                                        disabled={!selectedMunicipality}
                                    >
                                        <option value="">Select Barangay</option>
                                        {barangayList.map((barangay) => (
                                            <option key={barangay.bgy_code} value={barangay.bgy_code}>
                                                {barangay.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button className={`btn btn-primary ${isLoading && 'loading'}`} type="submit" disabled={isLoading}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = { registerEmployee };

export default connect(null, mapDispatchToProps)(EmployeeRegister);
