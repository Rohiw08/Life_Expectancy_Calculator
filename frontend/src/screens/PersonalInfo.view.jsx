import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar.jsx";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    height: { value: "", unit: "cm" },
    weight: { value: "", unit: "kg" },
    gender: "",
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      height: { ...prev.height, [name]: value },
    }));
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      weight: { ...prev.weight, [name]: value },
    }));
  };

  const saveToFirebase = async (data) => {
    try {
      if (!userId) {
        throw new Error("No authenticated user");
      }

      const db = getFirestore();
      await setDoc(doc(db, "userPersonalInfo", userId), {
        ...data,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", userId);
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await saveToFirebase(formData);
        console.log("Personal Info Submitted and Saved to Firebase: ", formData);
        navigate("/test");
      } else {
        console.log("Form submitted but not saved (user not authenticated): ", formData);
        // You might want to show a message to the user here
        navigate("/auth");
      }
    } catch (error) {
      console.error("Failed to save data: ", error);
      // Here you might want to show an error message to the user
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center md:pt-20">
        <Card className="w-full max-w-4xl px-6 py-10 lg:px-16 lg:py-12 xl:px-20 xl:py-16 bg-white shadow-lg mx-4">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-blue-600">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="name">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="surname">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="dateOfBirth">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 [&::-webkit-calendar-picker-indicator]:filter-none [&::-webkit-calendar-picker-indicator]:opacity-100"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="heightValue">
                    Height
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      id="heightValue"
                      name="value"
                      value={formData.height.value}
                      onChange={handleHeightChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      placeholder="Enter height"
                      required
                    />
                    <select
                      id="heightUnit"
                      name="unit"
                      value={formData.height.unit}
                      onChange={handleHeightChange}
                      className="block w-1/3 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    >
                      <option value="cm">cm</option>
                      <option value="ft">ft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="weightValue">
                    Weight
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      id="weightValue"
                      name="value"
                      value={formData.weight.value}
                      onChange={handleWeightChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                      placeholder="Enter weight"
                      required
                    />
                    <select
                      id="weightUnit"
                      name="unit"
                      value={formData.weight.unit}
                      onChange={handleWeightChange}
                      className="block w-1/3 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="gender">
                  Gender
                </label>
                <div className="flex space-x-6">
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                Submit Information
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default PersonalInfoPage;