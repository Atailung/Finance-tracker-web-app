"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../common/TestimonialData";
const Testimonials: React.FC = () => {
  // State to manage the current testimonial index
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-background dark:bg-gray-900">
      <div className="mb-12 *:flex flex-col items-center justify-center space-y-4 ">
        <div className="inline-block gap-6 items-center ">
          <h1 className="bg-lime-400 text-black px-4 py-2 rounded-lg font-bold text-xl">
            Testimonials
          </h1>
          <p className="text-foreground text-lg max-w-2xl dark:text-gray-300">
            Hear what our users have to say about their experience with our
            finance tracking solution.
          </p>
        </div>
      </div>
      {/* Testimonial Carousel */}
      <div className="relative">
        {/* Main Testimonial Card */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12 mx-4">
                  <div className="text-center max-w-4xl mx-auto">
                    {/* Quote Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-lime-100 dark:bg-lime-900/30 rounded-full mb-6">
                      <Quote className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium leading-relaxed mb-8">
                      {testimonial.quote}
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center mb-4">
                        <span className="text-white font-bold text-lg">
                          {testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:border-lime-300 dark:hover:border-lime-600 transition-all duration-200 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:border-lime-300 dark:hover:border-lime-600 transition-all duration-200 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center space-x-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-200 ${
              currentIndex === index
                ? "w-8 h-3 bg-lime-500 rounded-full"
                : "w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 max-w-xs mx-auto">
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime-500 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
