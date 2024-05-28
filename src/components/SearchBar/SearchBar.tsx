// import React, { useState, useEffect } from "react";
// import {
//   Toolbar,
//   TextField,
//   Box,
//   Divider,
//   IconButton,
//   CircularProgress,
//   Grid,
//   Paper,
//   Typography,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close"; // Importar CloseIcon
// import { debounce } from "lodash";
// import { HeaderLink } from "../Header/HeaderLink";
// import { Pokemon } from "../../types/pokemon";
// import fotoLogo from "../../assets/pokemon-logo-png-5.png";

// interface HeaderProps {}

// export  const Header: React.FC<HeaderProps> = () => {
//   const [searchValue, setSearchValue] = useState<string>('');
//   const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

//   useEffect(() => {
//     if (searchValue === '') {
//       setSearchResults([]);
//       return;
//     }

//     setLoading(true);
//     const handleSearch = debounce(async () => {
//       try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0`);
//         const data = await response.json();
//         const pokemonList: Pokemon[] = await Promise.all(data.results.map(async (result: any) => {
//           const response = await fetch(result.url);
//           const pokemonData = await response.json();
//           return {
//             name: pokemonData.name,
//             image: pokemonData.sprites.front_default,
//           };
//         }));
//         const filteredList = pokemonList.filter((pokemon: Pokemon) =>
//           pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
//         );
//         setSearchResults(filteredList);
//         setLoading(false);
//         setShowSearchResults(true); // Mostrar os resultados da pesquisa
//       } catch (error) {
//         console.error('Error searching Pokémon:', error);
//         setLoading(false);
//       }
//     }, 300);

//     handleSearch();

//     return () => {
//       handleSearch.cancel();
//     };
//   }, [searchValue]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//     setShowSearchResults(false); // Esconder os resultados ao limpar a pesquisa
//   };

//   const closeModal = () => {
//     setShowSearchResults(false); // Fechar a visualização dos resultados da pesquisa
//   };

//   return (
//     <StyledAppBar position="static">
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Logo src={fotoLogo} alt="Logo" />
//         </Box>
//         <HeaderLink />
//         <SearchBox>
//           <TextField
//             id="search"
//             label="Search Pokémon"
//             variant="outlined"
//             size="small"
//             value={searchValue}
//             onChange={handleInputChange}
//             sx={{ mr: 1 }}
//           />
//           <IconButton disabled={loading} onClick={() => {}}>
//             <SearchIcon />
//           </IconButton>
//           {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
//         </SearchBox>
//       </Toolbar>
//       <Divider orientation="vertical" flexItem sx={{ backgroundColor: "white", height: "1px", width: 1 }} />
//       {/* Renderização condicional dos resultados da pesquisa */}
//       {showSearchResults && (
//         <Paper sx={{ p: 2, maxWidth: 1000, margin: "auto", mt: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Search Results
//           </Typography>
//           <Grid container spacing={2}>
//             {searchResults.map((pokemon: Pokemon, index: number) => (
//               <Grid item xs={6} sm={4} md={3} key={index}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <img src={pokemon.image} alt={pokemon.name} style={{ width: 100, height: 100, borderRadius: '50%' }} />
//                   <Typography variant="body1">{pokemon.name}</Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//           {/* Botão ou ícone para fechar a visualização dos resultados da pesquisa */}
//           <IconButton onClick={closeModal}>
//             <CloseIcon />
//           </IconButton>
//         </Paper>
//       )}
//     </StyledAppBar>
//   );
// };


// Update Futuro