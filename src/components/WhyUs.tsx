import { Clock, Zap, HeartHandshake } from 'lucide-react';

export const WhyUs = () => {
  return (
    <div className="middle-container py-12 px-4 bg-white">
      <div className="content flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-10">Why Choose Us</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold">15+</span>
            <span className="font-medium text-gray-700">Years of Experience</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-10 h-10 text-green-600" />
            <span className="text-2xl font-bold">1000+</span>
            <span className="font-medium text-gray-700">Quality Products</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <HeartHandshake className="w-10 h-10 text-pink-600" />
            <span className="text-2xl font-bold">100%</span>
            <span className="font-medium text-gray-700">Happy Customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
