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
} from "@mui/material";
import { Pokemon } from '../../types/pokemon';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  selectedPokemon: Pokemon | null;
}

const ModalPokemon: React.FC<ModalProps> = ({ open, onClose, selectedPokemon }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              p: 1,
              maxWidth: 600,
              width: "90%",
              height: "80%",
              overflow: "auto",
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-45%, -45%)',
            }}
          >
            <Box sx={{ textAlign: "center" }}>
            
    
              <img
                src={selectedPokemon?.sprites.front_default}
                alt={selectedPokemon?.name}
                style={{ width: 90, height: 90, borderRadius: "20%",}}
              />
              <Typography variant="h5" sx={{ mt: 0.1 }}>
                {selectedPokemon?.name}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.1 }}>
                Height: {selectedPokemon?.height} dm
              </Typography>
              <Typography variant="body2">
                Weight: {selectedPokemon?.weight} hg
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.1 }}>
                Abilities:
              </Typography>
              <List>
                {selectedPokemon?.abilities.map((ability, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={ability.ability.name} />
                  </ListItem>
                ))}
              </List>
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
                      sx={{ width: '25%', borderRadius: '5px', marginBottom: '5px' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Box>
      </Slide>
    </Modal>
  );
};

export default ModalPokemon;
