import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function PlaylistDrawer({ playlistTracks, setPlaylistTracks }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function playExtract(e, extract) {
    let audio = e.target.audio || new Audio(extract);
    let button = e.target;

    if (audio.paused) {
      button.innerHTML = "<PauseIcon />";
      audio.play();
    } else {
      button.innerHTML = "<PlayArrowIcon />";
      audio.pause();
    }

    button.audio = audio;
  }

  function deleteFromPlaylist(track) {
    let index = playlistTracks.indexOf(track);
    let copy = [...playlistTracks];
    copy.splice(index, 1);

    setPlaylistTracks(copy);
  }

  const DrawerList = (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        🎵 Ma Playlist 🎵
      </Typography>
      <Card sx={{ p: 2, boxShadow: 3 }}>
        <List>
          {playlistTracks.length > 0 ? (
            playlistTracks.map((track) => (
              <ListItem
                key={track.trackId}
                sx={{ display: "flex", justifyContent: "space-between", bgcolor: "grey.100", mb: 1, p: 2, borderRadius: 2 }}
              >
                <IconButton onClick={() => deleteFromPlaylist(track)}>
                  <PlaylistRemoveIcon sx={{ color: "brown" }} />
                </IconButton>
                <IconButton onClick={(e) => playExtract(e, track.previewUrl)}>
                  <PlayArrowIcon sx={{ color: "blue" }} />
                </IconButton>
                <ListItemText primary={track.trackName} secondary={track.artistName} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              Aucune chanson dans la playlist.
            </Typography>
          )}
        </List>
      </Card>
    </Box>
  );

  return (
    <div className="playlist-drawer">
      <Button onClick={toggleDrawer(true)}>
        <LibraryMusicIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
}