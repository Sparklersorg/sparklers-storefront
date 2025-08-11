import React from 'react';

const QuotesContainer = () => {
  return (
    <div className="relative min-h-[30vh] flex flex-col items-center justify-center p-6 font-bold text-center">
          <img
            className="w-1/2 md:w-1/2 sm:w-4/5"
            src="assets/border.png"
            alt="border"
          />
          <h2 className="text-2xl sm:text-[15px] z-[2]">
            இந்த தீபாவளியை சிறந்த பட்டாசுகளுடன் கொண்டாடுங்கள்
          </h2>
          <img
            className="hidden md:block absolute top-5 right-20 h-[200px] scale-x-[-1]"
            src="assets/cracker2.png"
            alt="rocket"
          />
          <img
            className="hidden md:block absolute top-5 right-0 h-[200px]"
            src="assets/cracker3.png"
            alt="flowerpot"
          />
          <img
            className="hidden md:block absolute top-5 left-[60px] h-[200px]"
            src="assets/cracker4.png"
            alt="light"
          />
        </div>
  );
};

export default QuotesContainer;