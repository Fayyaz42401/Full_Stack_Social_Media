import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Divider, Stack } from "@mui/material";
import Icon from "../widgets/Icon";

const LeftBar = ({ user }) => {
  return (
    <Card sx={{ width: "100%", padding: " 10px" }}>
      <CardHeader
        avatar={<Avatar src={user.picture || "asd"} alt={user.name} />}
        title={user.name}
        subheader={user.friends?.length + " " + "friends"}
      />
      <Divider />
      <CardContent>
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="button">Email</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>

      <Divider />
      <CardContent>
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="button">About</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {user.about}
        </Typography>
      </CardContent>

      <Divider />
      <CardActions>
        <Stack>
          <Typography variant="button">Social Profiles</Typography>
          <Stack alignItems={"center"} direction={"row"}>
            <Icon title={"FaceBook"} Icon={<FacebookIcon />} />
            <a href={user.facebook} target="_blank">
              <Typography variant="body2" color="text.secondary">
                FaceBook
              </Typography>
            </a>
          </Stack>
          <Stack alignItems={"center"} direction={"row"}>
            <Icon title={"linkedIn"} Icon={<LinkedInIcon />} />
            <a href={user.linkedin} target="_blank">
              <Typography variant="body2" color="text.secondary">
                LinkedIn
              </Typography>
            </a>
          </Stack>
          <Stack alignItems={"center"} direction={"row"}>
            <Icon title={"Twitter"} Icon={<TwitterIcon />} />

            <a href={user.twitter} target="_blank">
              <Typography variant="body2" color="text.secondary">
                Twitter
              </Typography>
            </a>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default LeftBar;
