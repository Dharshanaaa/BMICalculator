"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import {
  UserIcon as Male,
  UserIcon as Female,
  ArrowRight,
  ArrowLeft,
  Scale,
  Ruler,
  RotateCcw,
} from "lucide-react";
import Footer from "./Footer";
const initialFormData = {
  gender: "",
  age: { year: "", month: "" },
  height: "",
  weight: "",
};

export default function BMICalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightInMeters = Number(formData.height) / 100;
    const weightInKg = Number(formData.weight);
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(Number(bmiValue.toFixed(2)));
    setStep(5);
  };

  const resetCalculator = () => {
    setFormData(initialFormData);
    setBmi(null);
    setStep(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5)
      return {
        text: "Underweight",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      };
    if (bmi >= 18.5 && bmi < 24.9)
      return {
        text: "Normal",
        color: "text-green-500",
        bgColor: "bg-green-50",
      };
    if (bmi >= 25 && bmi < 29.9)
      return {
        text: "Overweight",
        color: "text-yellow-500",
        bgColor: "bg-yellow-50",
      };
    return { text: "Obesity", color: "text-red-500", bgColor: "bg-red-50" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8 flex flex-col justify-between">
      <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl border-0 rounded-3xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="mb-8 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              BMI Calculator
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Calculate your Body Mass Index to track your health
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                  Choose Your Gender
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, gender: "male" });
                      setStep(2);
                    }}
                    className={`p-8 rounded-2xl transition-all duration-300 group hover:shadow-lg ${
                      formData.gender === "male"
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                        : "bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-4 rounded-full ${
                          formData.gender === "male"
                            ? "bg-blue-400"
                            : "bg-blue-200"
                        }`}
                      >
                        <Male
                          size={40}
                          className={
                            formData.gender === "male"
                              ? "text-white"
                              : "text-blue-500"
                          }
                        />
                      </div>
                      <span className="block mt-4 text-lg font-medium">
                        Male
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, gender: "female" });
                      setStep(2);
                    }}
                    className={`p-8 rounded-2xl transition-all duration-300 group hover:shadow-lg ${
                      formData.gender === "female"
                        ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white"
                        : "bg-purple-50 hover:bg-purple-100"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-4 rounded-full ${
                          formData.gender === "female"
                            ? "bg-purple-400"
                            : "bg-purple-200"
                        }`}
                      >
                        <Female
                          size={40}
                          className={
                            formData.gender === "female"
                              ? "text-white"
                              : "text-purple-500"
                          }
                        />
                      </div>
                      <span className="block mt-4 text-lg font-medium">
                        Female
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                  Enter Your Age
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Years
                    </label>
                    <Input
                      type="number"
                      value={formData.age.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: { ...formData.age, year: e.target.value },
                        })
                      }
                      className="h-12 text-lg"
                      placeholder="22"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      Months
                    </label>
                    <Input
                      type="number"
                      value={formData.age.month}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          age: { ...formData.age, month: e.target.value },
                        })
                      }
                      className="h-12 text-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">
                  Age Group: 2-50 Years
                </p>
                <div className="flex justify-between">
                  <Button
                    size="lg"
                    onClick={() => setStep(1)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-28"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setStep(3)}
                    disabled={!formData.age.year || !formData.age.month}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-28"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                  Enter Your Height
                </h2>
                <div className="relative">
                  <div className="flex items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                    <div className="text-center">
                      <div className="mb-4">
                        <Ruler size={48} className="mx-auto text-indigo-500" />
                      </div>
                      <Input
                        type="number"
                        value={formData.height}
                        onChange={(e) =>
                          setFormData({ ...formData, height: e.target.value })
                        }
                        className="h-16 text-2xl text-center w-32"
                        placeholder="165"
                      />
                      <span className="block mt-2 text-gray-500">
                        Centimeters
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    size="lg"
                    onClick={() => setStep(2)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-28"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setStep(4)}
                    disabled={!formData.height}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-28"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                  Enter Your Weight
                </h2>
                <div className="relative">
                  <div className="flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <div className="text-center">
                      <div className="mb-4">
                        <Scale size={48} className="mx-auto text-purple-500" />
                      </div>
                      <Input
                        type="number"
                        value={formData.weight}
                        onChange={(e) =>
                          setFormData({ ...formData, weight: e.target.value })
                        }
                        className="h-16 text-2xl text-center w-32"
                        placeholder="65"
                      />
                      <span className="block mt-2 text-gray-500">
                        Kilograms
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    size="lg"
                    onClick={() => setStep(3)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-28"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={calculateBMI}
                    disabled={!formData.weight}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-28"
                  >
                    Calculate
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 5 && bmi && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                  Your BMI Results
                </h2>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-48 h-48 rounded-full ${
                        getBMICategory(bmi).bgColor
                      } flex items-center justify-center p-8 shadow-lg`}
                    >
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-800">
                          {bmi}
                        </div>
                        <div
                          className={`text-lg font-medium mt-1 ${
                            getBMICategory(bmi).color
                          }`}
                        >
                          {getBMICategory(bmi).text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="text-xl font-semibold mt-1">
                      {formData.age.year} years
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500">Height</div>
                    <div className="text-xl font-semibold mt-1">
                      {formData.height} cm
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-indigo-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500">Weight</div>
                    <div className="text-xl font-semibold mt-1">
                      {formData.weight} kg
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-500">Gender</div>
                    <div className="text-xl font-semibold mt-1 capitalize">
                      {formData.gender}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={resetCalculator}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Calculate Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
      <Footer />
    </div>
  );
}
