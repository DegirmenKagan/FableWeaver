//profileContext
import React, { createContext } from "react";
import { User } from "../types/types";

type ProfileContextType = {
  profile: User;
  setProfile: React.Dispatch<React.SetStateAction<User>>;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: {
    id: 0,
    username: "John Doe",
    name: "John Doe",
    avatar: "",
    email: "",
    password: "password123",
  },
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: JSX.Element }) => {
  const [profile, setProfile] = React.useState<User>({
    id: 0,
    username: "John Doe",
    name: "John Doe",
    avatar: "",
    email: "",
    password: "password123",
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
