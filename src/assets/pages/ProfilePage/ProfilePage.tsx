import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { ProfileContext } from "../../contexts/ProfileContext";
import { patchBioByUserId } from "../../api/UserService";
import AuthDialog from "../../components/AuthDialog";

// Sample user data (replace with data from your API or props)

const ProfilePage = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  const [editingDescription, setEditingDescription] = useState(false);
  const [localBio, setLocalBio] = useState(profile.bio ?? "");
  const [open, setOpen] = useState<boolean>(false);

  // Toggles edit mode for the description
  const handleEditDescription = () => {
    setEditingDescription(!editingDescription);
  };

  // Handles description change
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLocalBio(event.target.value);
  };

  const handleBioSave = async () => {
    const response = await patchBioByUserId(profile.id, localBio);
    if (response) {
      setProfile(response);
    }
    setEditingDescription(false);
  };

  useEffect(() => {
    if (profile.id < 2) {
      setOpen(true);
    } else {
      console.log(profile.bio, "profile.bio");
      setLocalBio(profile.bio ?? "");
      // getBadgesByUserId(); //todo implement this function
    }
  }, []);

  return (
    <>
      {profile.id === 1 ? ( // If user is not logged in, show the login dialog
        <AuthDialog open={open} setOpen={setOpen} />
      ) : (
        <Box p={3} display="flex" justifyContent="center">
          <Card sx={{ maxWidth: 600, width: "100%" }}>
            <CardContent>
              {/* User Avatar and Name */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={3}
              >
                <Avatar
                  src={profile.avatar}
                  alt={profile.name}
                  sx={{ width: 120, height: 120, bgcolor: deepOrange[500] }}
                />
                <Typography variant="h4" mt={2}>
                  {profile.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {profile.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {/* Joined on {formatDate(profile.joinDate)} */}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description Section */}
              <Box mb={3}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">About Me</Typography>
                  {editingDescription ? (
                    <></>
                  ) : (
                    <IconButton size="small" onClick={handleEditDescription}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                {editingDescription ? (
                  <Box>
                    <textarea
                      rows={4}
                      value={localBio}
                      onChange={(e) => handleDescriptionChange(e)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        fontSize: "16px",
                      }}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={handleEditDescription}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleBioSave}
                      >
                        Save
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body1" mt={1}>
                    {localBio}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Badges Section */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Badges
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {/* {profile.badges.map((badge, index) => (
                <Chip
                  key={index}
                  label={badge}
                  icon={<BadgeIcon />}
                  color="primary"
                  variant="outlined"
                />
              ))} */}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
