//profileContext
import React, { createContext, useEffect } from "react";
import { IUserDto } from "../api/UserService";

type ProfileContextType = {
  profile: IUserDto;
  setProfile: React.Dispatch<React.SetStateAction<IUserDto>>;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: {
    id: 1,
    created_at: new Date().toISOString(),
    username: "guest",
    name: "Guest User",
    avatar: "",
    email: "",
    // password: "password123",
  },
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: JSX.Element }) => {
  const guestUser = {
    id: 1,
    created_at: new Date().toISOString(),
    username: "guest",
    name: "Guest User",
    avatar: "",
    email: "",
  };

  // //check localstorage for user data
  // const user = localStorage.getItem("sb-rpgcjsjnthafqlncaqhf-auth-token");
  // if (user) {
  //   const userData = JSON.parse(user);
  //   guestUser.id = userData.user.id;

  //   localStorage.setItem("user",)
  //   console.log("userDsata", userData);
  // }

  const [profile, setProfile] = React.useState<IUserDto>(guestUser);

  useEffect(() => {
    if (profile.id < 2) {
      const storedProfile = localStorage.getItem("profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } else {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
