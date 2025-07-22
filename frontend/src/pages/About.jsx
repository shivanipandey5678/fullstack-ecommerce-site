import React from 'react'
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <>
    
    <div className="flex flex-col gap-16 p-6 md:p-16 mb-20">
      
      {/* ABOUT US Section */}
      <section className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_img}
            alt="clothes"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">ABOUT <span className="font-bold">US</span></h2>
          <p className="text-gray-700 text-sm">
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online...
          </p>
          <p className="text-gray-700 text-sm">
            Since our inception, we’ve worked tirelessly to curate a diverse selection of high-quality products...
          </p>
          <h4 className="font-bold mt-2">Our Mission</h4>
          <p className="text-gray-700 text-sm">
            Our mission at Forever is to empower customers with choice, convenience, and confidence...
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US Section */}
      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-8">WHY <span className="font-bold">CHOOSE US</span></h2>

        <div className="grid md:grid-cols-3  text-center">
          <div className="p-12 border flex flex-col item-center ">
            <h3 className="font-bold mb-2">QUALITY ASSURANCE</h3>
            <p className="text-sm text-gray-600">
              We meticulously select and vet each product to ensure it meets our stringent standards.
            </p>
          </div>

          <div className="p-12 border flex flex-col item-center">
            <h3 className="font-bold mb-2">CONVENIENCE</h3>
            <p className="text-sm text-gray-600">
              With our user-friendly interface and hassle-free checkout, shopping has never been easier.
            </p>
          </div>

          <div className="p-12 border flex flex-col item-center">
            <h3 className="font-bold mb-2">CUSTOMER SERVICE</h3>
            <p className="text-sm text-gray-600">
              Our team of dedicated professionals is here to assist you and ensure satisfaction.
            </p>
          </div>
        </div>
      </section>
    </div>
    <NewsLetterBox/>
    </>
  );
};


export default About
