import React from "react";

const BusinessSection = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-14">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        My Store Ratings
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mt-2">
        See what customers say about my store.
      </p>

      <div className="w-full border-t border-gray-300 my-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-500 text-left">
        <p>
          Our customers have consistently praised our commitment to quality and customer service. Many have shared their experiences of receiving products that exceeded their expectations, both in terms of durability and design. From the moment they place an order to the time their package arrives, we ensure a smooth and hassle-free shopping journey. We take pride in offering a seamless user experience, ensuring that our customers can easily find what they need and place their orders without any difficulties. The positive feedback from our users has motivated us to continuously improve and innovate, making shopping a delightful experience for all.
        </p>
        <p>
          Customers also appreciate our fast shipping and reliable customer support. Many have mentioned how our team goes above and beyond to resolve any issues, answer queries promptly, and ensure complete satisfaction. We value transparency, and that’s why we provide detailed product descriptions, high-quality images, and genuine customer reviews to help shoppers make informed decisions. Our mission is to create a trustworthy platform where customers can shop with confidence, knowing they will receive only the best. The consistent five-star ratings and heartwarming testimonials encourage us to maintain our high standards and deliver excellence every step of the way.
        </p>
      </div>
    </div>
  );
};

export default BusinessSection;
