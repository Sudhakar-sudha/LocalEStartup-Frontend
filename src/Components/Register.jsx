import Swal from 'sweetalert2';
import React, { useState, useRef } from 'react';
import Logo from '/Logo.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";


import myImage from "/boyrunning.gif"
import myImage1 from "/animatedcatthumbsup.gif"


const BASE_URL = import.meta.env.VITE_BASE_URL;


const showPopup = () => {
    Swal.fire({
        title: 'Form Submitted!',
        text: 'Your form has been submitted successfully.',
        icon: 'success',
        imageUrl: myImage1,
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Success Image',
        confirmButtonText: 'OK',
        customClass: {
            popup: 'rounded-lg shadow-lg',
            title: 'text-lg font-bold',
            confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
        }
    });
};

const Register = () => {

    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [sellerData, setSellerData] = useState({
        personalInfo: {
            name: '',
            email: '',
            phone: '',
            password: '',
            address: '',
            gender: '',
        },
        companyInfo: {
            companyName: '',
            companyEmail: '',
            companyPhone: '',
            companyAddress: '',
            ownerName: '',
            products: [],
        },
        bankInfo: {
            bankName: '',
            accountNumber: '',
            branchName: '',
            accountHolderName: '',
            bankAddress: '',
            bankType: '',
        },
    });

    const [errors, setErrors] = useState({});
    const stepRefs = useRef([]);

    const totalSteps = 4; // Total steps including Summary step

    // Validate each step's input fields
    const validateStep = (step) => {
        let currentErrors = {};
        switch (step) {
            case 0: // Personal Info Validation
                if (!sellerData.personalInfo.name.trim() || /\s{2,}/.test(sellerData.personalInfo.name)) {
                    currentErrors.name = 'Name is required and should not have consecutive spaces';
                }

                if (!sellerData.personalInfo.email || !validateEmail(sellerData.personalInfo.email)) {
                    currentErrors.email = 'Please enter a valid email';
                }
                if (!/^\d{10}$/.test(sellerData.personalInfo.phone)) {
                    currentErrors.phone = 'Phone number must be exactly 10 digits and contain only numbers';
                }

                if (!sellerData.personalInfo.password || sellerData.personalInfo.password.length <= 8) {
                    currentErrors.password = 'Password must be greater than 8 characters';
                }
                if (!sellerData.personalInfo.address) currentErrors.address = 'Address is required';
                if (!sellerData.personalInfo.gender) currentErrors.gender = 'Gender is required';
                break;

            case 1: // Company Info Validation
                if (!sellerData.companyInfo.companyName) currentErrors.companyName = 'Company Name is required';
                if (!sellerData.companyInfo.companyEmail || !validateEmail(sellerData.companyInfo.companyEmail)) {
                    currentErrors.companyEmail = 'Please enter a valid company email';
                }
                if (!/^\d{10}$/.test(sellerData.companyInfo.companyPhone)) {
                    currentErrors.companyPhone = 'Company phone number must be exactly 10 digits and contain only numbers';
                }

                if (!sellerData.companyInfo.companyAddress) currentErrors.companyAddress = 'Company Address is required';
                if (!sellerData.companyInfo.ownerName) currentErrors.ownerName = 'Owner Name is required';
                if (!sellerData.companyInfo.products) currentErrors.products = 'List of Products is required';
                break;

            case 2: // Bank Info Validation
                if (!sellerData.bankInfo.bankName) currentErrors.bankName = 'Bank Name is required';
                if (!/^\d{12}$/.test(sellerData.bankInfo.accountNumber)) {
                    currentErrors.accountNumber = 'Account Number must be exactly 12 digits and contain only numbers';
                }
                if (!sellerData.bankInfo.branchName) currentErrors.branchName = 'Branch Name is required';
                if (!sellerData.bankInfo.accountHolderName) currentErrors.accountHolderName = 'Account Holder Name is required';
                if (!sellerData.bankInfo.bankAddress) currentErrors.bankAddress = 'Bank Address is required';
                if (!sellerData.bankInfo.bankType) currentErrors.bankType = 'Bank Type (Saving/Current) is required';
                break;

            default:
                break;
        }
        setErrors(currentErrors);
        return Object.keys(currentErrors).length === 0;
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const scrollToNextStep = (nextStep) => {
        if (validateStep(currentStep)) {
            setCurrentStep(nextStep);
            if (stepRefs.current[nextStep]) {
                stepRefs.current[nextStep].scrollIntoView({ behavior: 'smooth' });
            }
        }
    };


    const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the current step before submitting
        if (validateStep(currentStep)) {
            // Print the form data to the console before sending it to the backend
            console.log("Form Data Submitted:", sellerData);

            if (!isAgreedToTerms) {
                alert('You must agree to the terms and conditions.');
                return;
            }

            try {
                // Send data to the backend
                const response = await fetch(`${BASE_URL}/sellerdata/submit-seller-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sellerData), // Sending sellerData to the backend
                });

                const result = await response.json(); // Get the response from backend

                if (response.ok) {
                    //   alert('Form submitted successfully!');
                    showPopup();
                    console.log(result); // Log the successful response from backend

                    // Navigate to OTP Verification component with email
                    navigate("/otp-verification", { state: { email: sellerData.personalInfo.email } });
                } else {
                    console.error('Error submitting form data:', result.error);
                    alert('Failed to submit form. Please try again.');
                }
            } catch (error) {
                console.error('Error connecting to backend:', error);
                alert('An error occurred while submitting the form. Please try again.');
            }
        }
    };



    // Calculate progress as a percentage
    const progress = ((currentStep) / (totalSteps - 1)) * 100;
    return (
        <div>

            <div className="flex justify-center items-center  bg-gradient-to-r from-blue-100 to-blue-300 p-14 pb-20">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Seller Sign Up Form</h1>

                    {/* Step Indicator */}
                    <div className="relative w-full p-10 -ml-8">
                        <div className="relative w-full bg-gray-300 h-2 rounded-full">
                            {/* Progress Bar */}
                            {/* <img src={myImage} alt="My Image" className="w-10 h-10 object-cover " /> */}
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}>

                            </div>

                            {/* Step Circles */}
                            <div className="absolute top-0 left-0 flex justify-between w-full h-full items-center">
                                {[0, 1, 2, 3].map((step, index) => (
                                    <div
                                        key={index}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl
                    ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        style={{ position: 'absolute', left: `${(index / (totalSteps - 1)) * 100}%` }}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                                {/* Moving Image Aligned with Current Step */}
                                <img
                                    src={myImage}
                                    alt="My Image"
                                    className="w-20 h-20 object-cover absolute transition-all duration-300"
                                    style={{
                                        left: `${progress}%`,
                                        transform: 'translate(-50%, -50%)',
                                        top: '-20px', // Adjust the top positioning if needed
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Personal Information */}
                    {/* Personal Information Section */}
                    <div ref={(el) => (stepRefs.current[0] = el)}>
                        {currentStep === 0 && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-medium mb-4 text-gray-700">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.personalInfo.name}
                                            onChange={(e) =>
                                                setSellerData({ ...sellerData, personalInfo: { ...sellerData.personalInfo, name: e.target.value } })
                                            }
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.personalInfo.email}
                                            onChange={(e) =>
                                                setSellerData({ ...sellerData, personalInfo: { ...sellerData.personalInfo, email: e.target.value } })
                                            }
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Phone Number</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.personalInfo.phone}
                                            onChange={(e) =>
                                                setSellerData({ ...sellerData, personalInfo: { ...sellerData.personalInfo, phone: e.target.value } })
                                            }
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                    </div>

                                    {/* Password */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.personalInfo.password}
                                            onChange={(e) =>
                                                setSellerData({ ...sellerData, personalInfo: { ...sellerData.personalInfo, password: e.target.value } })
                                            }
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                    </div>

                                    {/* Address */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Address</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.personalInfo.address}
                                            onChange={(e) =>
                                                setSellerData({ ...sellerData, personalInfo: { ...sellerData.personalInfo, address: e.target.value } })
                                            }
                                            placeholder="Enter your address"
                                        />
                                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                    </div>

                                    {/* Gender */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Gender</label>
                                        <select
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.personalInfo.gender}
                                            onChange={(e) =>
                                                setSellerData({ ...sellerData, personalInfo: { ...sellerData.personalInfo, gender: e.target.value } })
                                            }
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Step 2: Company Information */}
                    <div ref={(el) => (stepRefs.current[1] = el)}>
                        {currentStep === 1 && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-medium mb-4 text-gray-700">Company Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Company Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Company Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.companyInfo.companyName}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    companyInfo: { ...sellerData.companyInfo, companyName: e.target.value },
                                                })
                                            }
                                            placeholder="Enter company name"
                                        />
                                        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                                    </div>

                                    {/* Company Email */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Company Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.companyInfo.companyEmail}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    companyInfo: { ...sellerData.companyInfo, companyEmail: e.target.value },
                                                })
                                            }
                                            placeholder="Enter company email"
                                        />
                                        {errors.companyEmail && <p className="text-red-500 text-sm">{errors.companyEmail}</p>}
                                    </div>

                                    {/* Company Phone */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Company Phone</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.companyInfo.companyPhone}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    companyInfo: { ...sellerData.companyInfo, companyPhone: e.target.value },
                                                })
                                            }
                                            placeholder="Enter company phone"
                                        />
                                        {errors.companyPhone && <p className="text-red-500 text-sm">{errors.companyPhone}</p>}
                                    </div>

                                    {/* Company Address */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Company Address</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.companyInfo.companyAddress}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    companyInfo: { ...sellerData.companyInfo, companyAddress: e.target.value },
                                                })
                                            }
                                            placeholder="Enter company address"
                                        />
                                        {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}
                                    </div>

                                    {/* Owner Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Owner Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.companyInfo.ownerName}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    companyInfo: { ...sellerData.companyInfo, ownerName: e.target.value },
                                                })
                                            }
                                            placeholder="Enter owner name"
                                        />
                                        {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
                                    </div>

                                    {/* List of Products */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">List of Products</label>
                                        <textarea
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.companyInfo.products.join(', ')} // Convert array back to a comma-separated string
                                            onChange={(e) => {
                                                const productsArray = e.target.value.split(',').map((product) => product.trim()); // Split and trim input
                                                setSellerData({
                                                    ...sellerData,
                                                    companyInfo: { ...sellerData.companyInfo, products: productsArray },
                                                });
                                            }}
                                            placeholder="Enter list of products, separated by commas (e.g., Product1, Product2)"
                                        ></textarea>
                                        {errors.products && <p className="text-red-500 text-sm">{errors.products}</p>}
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Bank Information */}
                    <div ref={(el) => (stepRefs.current[2] = el)}>
                        {currentStep === 2 && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-medium mb-4 text-gray-700">Bank Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Bank Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Bank Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.bankInfo.bankName}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    bankInfo: { ...sellerData.bankInfo, bankName: e.target.value },
                                                })
                                            }
                                            placeholder="Enter bank name"
                                        />
                                        {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
                                    </div>

                                    {/* Account Number */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Account Number</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.bankInfo.accountNumber}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    bankInfo: { ...sellerData.bankInfo, accountNumber: e.target.value },
                                                })
                                            }
                                            placeholder="Enter account number"
                                        />
                                        {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
                                    </div>

                                    {/* Branch Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Branch Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.bankInfo.branchName}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    bankInfo: { ...sellerData.bankInfo, branchName: e.target.value },
                                                })
                                            }
                                            placeholder="Enter branch name"
                                        />
                                        {errors.branchName && <p className="text-red-500 text-sm">{errors.branchName}</p>}
                                    </div>

                                    {/* Account Holder Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Account Holder Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.bankInfo.accountHolderName}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    bankInfo: { ...sellerData.bankInfo, accountHolderName: e.target.value },
                                                })
                                            }
                                            placeholder="Enter account holder's name"
                                        />
                                        {errors.accountHolderName && <p className="text-red-500 text-sm">{errors.accountHolderName}</p>}
                                    </div>

                                    {/* Bank Address */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Bank Address</label>
                                        <input
                                            type="text"
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.bankInfo.bankAddress}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    bankInfo: { ...sellerData.bankInfo, bankAddress: e.target.value },
                                                })
                                            }
                                            placeholder="Enter bank address"
                                        />
                                        {errors.bankAddress && <p className="text-red-500 text-sm">{errors.bankAddress}</p>}
                                    </div>

                                    {/* Bank Type */}
                                    <div className="mb-4">
                                        <label className="block text-gray-600">Bank Type</label>
                                        <select
                                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                            value={sellerData.bankInfo.bankType}
                                            onChange={(e) =>
                                                setSellerData({
                                                    ...sellerData,
                                                    bankInfo: { ...sellerData.bankInfo, bankType: e.target.value },
                                                })
                                            }
                                        >
                                            <option value="">Select Bank Type</option>
                                            <option value="saving">Saving</option>
                                            <option value="current">Current</option>
                                        </select>
                                        {errors.bankType && <p className="text-red-500 text-sm">{errors.bankType}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>






                    {/* Step 4: Summary */}
                    <div ref={(el) => (stepRefs.current[3] = el)}>
                        {currentStep === 3 && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Summary</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Column 1: Personal and Company Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-gray-600">Personal & Company Details</h3>
                                        <p><strong>Name:</strong> {sellerData.personalInfo.name || 'N/A'}</p>
                                        <p><strong>Email:</strong> {sellerData.personalInfo.email || 'N/A'}</p>
                                        <p><strong>Phone:</strong> {sellerData.personalInfo.phone || 'N/A'}</p>
                                        <p><strong>Address:</strong> {sellerData.personalInfo.address || 'N/A'}</p>
                                        <p><strong>Gender:</strong> {sellerData.personalInfo.gender || 'N/A'}</p>
                                        <p><strong>Company Name:</strong> {sellerData.companyInfo.companyName || 'N/A'}</p>
                                        <p><strong>Owner Name:</strong> {sellerData.companyInfo.ownerName || 'N/A'}</p>
                                        <p><strong>Company Email:</strong> {sellerData.companyInfo.companyEmail || 'N/A'}</p>
                                        <p><strong>Company Phone:</strong> {sellerData.companyInfo.companyPhone || 'N/A'}</p>
                                        <p><strong>Company Address:</strong> {sellerData.companyInfo.companyAddress || 'N/A'}</p>
                                        <div>
                                            <strong>Products:</strong>
                                            {Array.isArray(sellerData.companyInfo.products) && sellerData.companyInfo.products.length > 0 ? (
                                                <ul className="list-disc list-inside ml-4 text-gray-700">
                                                    {sellerData.companyInfo.products.map((product, index) => (
                                                        <li key={index}>{product}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>No products listed</span>
                                            )}
                                        </div>


                                    </div>

                                    {/* Column 2: Bank Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-gray-600">Bank Details</h3>
                                        <p><strong>Bank Name:</strong> {sellerData.bankInfo.bankName || 'N/A'}</p>
                                        <p><strong>Account Number:</strong> {sellerData.bankInfo.accountNumber || 'N/A'}</p>
                                        <p><strong>Branch Name:</strong> {sellerData.bankInfo.branchName || 'N/A'}</p>
                                        <p><strong>Account Holder Name:</strong> {sellerData.bankInfo.accountHolderName || 'N/A'}</p>
                                        <p><strong>Bank Address:</strong> {sellerData.bankInfo.bankAddress || 'N/A'}</p>
                                        <p><strong>Bank Type:</strong> {sellerData.bankInfo.bankType || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Declaration Checkbox */}
                                <div className="mt-6">
                                    <label className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={isAgreedToTerms}
                                            onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                                            className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                                        />
                                        <span className="text-gray-700">
                                            I hereby confirm that all the information provided is accurate and agree to the terms and conditions.
                                        </span>
                                    </label>
                                    {!isAgreedToTerms && (
                                        <p className="text-red-500 text-sm mt-2">
                                            You must agree to the terms and conditions to proceed.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        {/* Previous Button */}
                        <button
                            onClick={() => setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))}
                            className={`py-2 px-4 rounded-lg text-white ${currentStep === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gray-500 hover:bg-gray-600'
                                }`}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </button>

                        {/* Next or Submit Button */}
                        <div className="flex space-x-4">
                            {currentStep < 3 ? (
                                <button
                                    onClick={() => scrollToNextStep(currentStep + 1)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!isAgreedToTerms}
                                    className={` mt-4 px-6 py-2 text-white font-medium rounded-lg ${isAgreedToTerms ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Submit
                                </button>
                            )}
                            {/* Popup Modal */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Register;