import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ProfileCard = ({ name, profession, description, profileImage }) => {
  return (
    <>
      <Card className="w-96 min-h-96">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img
              src={profileImage}
              width={100}
              height={100}
              alt={name}
              className="rounded-full"
            />
          </div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{profession}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </>
  );
};

export { ProfileCard };