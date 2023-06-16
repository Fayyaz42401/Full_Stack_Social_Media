import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Icon from "../widgets/Icon";
import { addFriend, getUser } from "../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { USER_API } from "../../utils/api";
import axios from "axios";

const RightBar = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const { data } = await axios.get(`${USER_API}/alluser`, {
      withCredentials: true,
    });
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUser();
  }, [users]);

  return (
    <Paper
      elevation={2}
      variant="elevation"
      sx={{ height: "90vh", width: "100%", overflowY: "auto" }}
    >
      <Stack>
        <Typography
          textAlign={"center"}
          variant={"button"}
          sx={{ padding: "10px " }}
        >
          recommended Friends
        </Typography>
        <Divider />
        {users?.map((users) => {
          return <FriendCard users={users} key={users._id} />;
        })}
      </Stack>
    </Paper>
  );
};

export default RightBar;

const FriendCard = ({ users }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initial = user.friends.find((item) => {
    if (item.userId === users._id) {
      return true;
    }
  });
  const [checkedFriend, setCheckedFriend] = useState(initial);

  const friendHandler = (id) => {
    dispatch(addFriend(id));
    dispatch(getUser());
    setCheckedFriend(!checkedFriend);
  };

  return (
    <Card key={users._id}>
      <CardHeader
        title={users.name}
        subheader={`${users.friends.length} friends`}
        avatar={<Avatar src={users.picture || "ad"} alt={users.name} />}
        action={
          <Icon
            handler={() => friendHandler(users._id)}
            title={checkedFriend ? "Remove Friend" : "Add Friend"}
            Icon={
              checkedFriend ? (
                <PersonRemoveIcon color="error" />
              ) : (
                <PersonAddIcon color="success" />
              )
            }
          />
        }
      />
    </Card>
  );
};
