import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { ProfileCard } from "../components/ProfileCard.jsx";
import teamData from "../data/teamData.js";
import referencesData from "../data/referencesData.js";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8">
      <Navbar />
      <div className="text-center mb-8 pt-16">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Learn more about us, our mission, and the people behind it.
        </p>
      </div>

      <Separator className="mb-8" />

      {/* Mission Statement */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Our Mission</CardTitle>
          <CardDescription>
            We strive to create innovative solutions that improve the lives of
            our people.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            This research project aims to develop a Life Expectancy Calculator
            that utilizes statistical models, machine learning algorithms, and
            health data analytics to estimate individual life expectancy based
            on personal and environmental factors. The calculator incorporates
            variables such as age, sex, lifestyle habits (e.g., diet, exercise,
            smoking), medical history, and socioeconomic conditions. Through the
            analysis of large-scale datasets and application of predictive
            algorithms, this tool provides personalized life-expectancy
            predictions. The project's objective is to assist individuals and
            healthcare professionals in making informed decisions regarding
            health and wellness planning. Furthermore, this tool has the
            potential to contribute to public health research by identifying key
            factors influencing life expectancy and facilitating the design of
            more targeted health interventions.
          </p>
        </CardContent>
      </Card>

      {/* Our Team Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Meet Our Team</h2>

        <div className="flex justify-center items-center space-x-8">
          {/* Dynamically generate team member cards */}
          {teamData.map((member, index) => (
            <ProfileCard
              key={index}
              name={member.name}
              profession={member.profession}
              description={member.description}
              profileImage={member.profileImage}
            />
          ))}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* References Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">References</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside pl-4">
            {referencesData.map((reference, index) => (
              <li key={index} className="mb-2 text-left">
                <a
                  href={reference.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {reference.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
