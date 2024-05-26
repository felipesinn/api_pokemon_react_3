import React from "react";
import {
  Box,
  Typography,
  Modal,
  Slide,
  Paper,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Pokemon } from "../../types/pokemon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  selectedPokemon: Pokemon | null;
}

const ModalPokemon: React.FC<ModalProps> = ({
  open,
  onClose,
  selectedPokemon,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1300,
          }}
        >
          <CloseIcon sx={{ color: "#ffffff" }} />
        </IconButton>

        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper
            sx={{
              p: 2,
              border: "2px solid #ff5733",
              borderRadius: "10px",
              maxWidth: 350,
              maxHeight: "80vh",
              width: "90%",
              overflow: "auto",
              backgroundColor: "#ffeaae",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card sx={{ maxWidth: 300, width: "100%" }}>
                <CardActionArea>
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      color: "#1e88e5",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedPokemon?.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3.5,
                      color: "#ff5733",
                    }}
                  >
                    <Typography variant="body2">
                      Height: {selectedPokemon?.height} dm
                    </Typography>
                    <Typography variant="body2">
                      Weight: {selectedPokemon?.weight} hg
                    </Typography>
                  </Box>

                  <CardMedia
                    component="img"
                    height="180"
                    src={selectedPokemon?.sprites.front_default}
                    alt={selectedPokemon?.name}
                    sx={{
                      objectFit: "contain",
                      borderRadius: "62px 62px 0px 0px",
                      backgroundColor: "#ffc100",
                    }}
                  />
                </CardActionArea>
              </Card>
            </Box>

            <Box
              sx={{
                mt: 2,
                color: "#ff5733",
              }}
            >
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Abilities:
              </Typography>
              <List>
                {selectedPokemon?.abilities.map((ability, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={ability.ability.name} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Stats:</Typography>
              <List>
                {selectedPokemon?.stats.map((stat, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${stat.stat.name}: ${stat.base_stat}`}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={stat.base_stat}
                      sx={{
                        width: "100%",
                        borderRadius: "5px",
                        marginBottom: "5px",
                        backgroundColor: "#ffc100",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Slide>
      </Box>
    </Modal>
  );
};

export default ModalPokemon;
