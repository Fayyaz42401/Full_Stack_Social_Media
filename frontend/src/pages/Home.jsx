import { Box, Button, Container, Paper, Stack } from "@mui/material";
import React from "react";
import Header from "../components/layout/Header";
import LeftBar from "../components/sidebar/LeftBar";
import RightBar from "../components/sidebar/RightBar";
import Feed from "../components/sidebar/Feed";

const Home = ({ user, allUsers }) => {
  return (
    <div>
      <Header user={user} />
      <Stack
        px={{ xs: 0, sm: 2 }}
        py={2}
        minHeight={"150vh"}
        justifyContent={"center"}
        direction={"row"}
      >
        <Box
          sx={{ alignSelf: "flex-start" }}
          position={"sticky"}
          display={{ xs: "none", md: "flex" }}
          top={"80px"}
          width={"500px"}
          height={"auto"}
        >
          <LeftBar user={user} />
        </Box>
        <Container sx={{ width: "100%" }}>
          <Feed user={user} />
        </Container>
        <Box
          sx={{ alignSelf: "flex-start" }}
          position={"sticky"}
          top={"80px"}
          width={{ sm: "300px", md: "500px" }}
          height={"auto"}
          display={{ xs: "none", sm: "flex" }}
        >
          <RightBar user={user} allUsers={allUsers} />
        </Box>
      </Stack>
    </div>
  );
};

export default Home;
