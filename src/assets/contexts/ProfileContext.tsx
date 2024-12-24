//profileContext
import React, { createContext } from "react";
import { IUserDto } from "../api/UserService";

type ProfileContextType = {
  profile: IUserDto;
  setProfile: React.Dispatch<React.SetStateAction<IUserDto>>;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: {
    id: 0,
    created_at: new Date().toISOString(),
    username: "Guest",
    name: "Guest User",
    avatar: "",
    email: "",
    // password: "password123",
  },
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: JSX.Element }) => {
  const guestUser = {
    id: 0,
    created_at: new Date().toISOString(),
    username: "Guest",
    name: "Guest User",
    avatar: "",
    email: "",
  };

  const [profile, setProfile] = React.useState<IUserDto>(guestUser);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
