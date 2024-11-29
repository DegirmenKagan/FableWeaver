import React, { useContext, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import BadgeIcon from "@mui/icons-material/Verified";
import { ProfileContext } from "../../contexts/ProfileContext";

// Sample user data (replace with data from your API or props)
const userData = {
  name: "Jane Doe",
  email: "janedoe@example.com",
  joinDate: "2023-01-15",
  description: "Avid reader, writer, and traveler. Loves technology and art.",
  avatarUrl: "https://via.placeholder.com/150",
  badges: ["Top Contributor", "Early Adopter", "Bookworm"],
};

const ProfilePage = () => {
  const { profile } = useContext(ProfileContext);

  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(userData.description);

  // Toggles edit mode for the description
  const handleEditDescription = () => {
    setEditingDescription(!editingDescription);
  };

  // Handles description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Function to display join date in a readable format
  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 600, width: "100%" }}>
        <CardContent>
          {/* User Avatar and Name */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={userData.avatarUrl}
              alt={userData.name}
              sx={{ width: 120, height: 120, bgcolor: deepOrange[500] }}
            />
            <Typography variant="h4" mt={2}>
              {userData.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userData.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Joined on {formatDate(userData.joinDate)}
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
              <IconButton size="small" onClick={handleEditDescription}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            {editingDescription ? (
              <Box>
                <textarea
                  rows={4}
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                />
                <Box display="flex" justifyContent="flex-end" mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => setEditingDescription(false)}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body1" mt={1}>
                {description}
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
              {userData.badges.map((badge, index) => (
                <Chip
                  key={index}
                  label={badge}
                  icon={<BadgeIcon />}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
