import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-6 md:px-12 lg:px-24">
      <div className="w-full md:w-3/4 lg:w-1/2 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-lg text-gray-500 mt-2">Feel free to reach out to us for any queries or assistance.</p>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center space-x-3">
          <Phone className="text-blue-500" size={24} />
          <p className="text-gray-700 font-semibold">+1 (123) 456-7890</p>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="text-red-500" size={24} />
          <p className="text-gray-700 font-semibold">contact@example.com</p>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="text-green-500" size={24} />
          <p className="text-gray-700 font-semibold">New York, USA</p>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-10 mt-10">
        <div className="md:w-1/2">
          <img src="https://imgs.search.brave.com/aprf82I8jMzf7xjbO0zRCF_6PHDOFxnf4p5e1SxAunI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9oYW5kLWJ1c2lu/ZXNzbWFuLWhvbGRp/bmctbW9iaWxlLXNt/YXJ0cGhvbmUtd2l0/aC1tYWlscGhvbmVl/bWFpbC1pY29uLWN1/c3RvbWVyLXN1cHBv/cnQtY29uY2VwdC1j/b3B5LXNwYWNlXzU2/Mjg1OS01Nzc4Lmpw/Zz9zZW10PWFpc19o/eWJyaWQ" alt="Contact" className="w-full h-auto" />
        </div>
        <div className="md:w-1/2 bg-white border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Send a Message</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full py-2 text-white font-semibold transition ${submitted ? "bg-green-500 cursor-not-allowed" : "bg-black hover:bg-gray-600"}`}
              disabled={submitted}
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
