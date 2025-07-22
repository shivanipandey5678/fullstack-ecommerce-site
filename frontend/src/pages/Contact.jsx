import React from "react";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
const ContactUs = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row items-start gap-8 p-6 md:p-16 mb-20">
      {/* Left Side Image */}
      <div className="w-full md:w-1/2">
        <img
          src={assets.contact_img}
          alt="office setup"
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Right Side Text */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">CONTACT <span className="text-black font-bold">US</span></h2>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-gray-800">OUR STORE</h3>
          <p className="text-sm text-gray-500">54709 Willms Station</p>
          <p className="text-sm ">Suite 350, Washington, USA</p>
          <p className="text-sm text-gray-700">Tel: (415) 555-0132</p>
          <p>Email:shivanipandey0107@gmail.com</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-gray-800">CAREERS AT FOREVER</h3>
          <p className="text-gray-600 text-sm">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-gray-800 px-5 py-2 text-sm hover:bg-gray-800 hover:text-white transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
      
    </div>
    <NewsLetterBox/> 
    </>
  );
};
export default ContactUs;
