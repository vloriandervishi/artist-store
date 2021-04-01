import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
// import atob from 'átob';
import Auth from "../utils/auth";
import {  searchArtApi} from '../utils/API';
import { saveArtIds, getSavedArtIds } from "../utils/localStorage";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_ART } from "../utils/mutations";
const SearchArt = () => {
  // create state for holding returned google api data
  const [searchArt, setSearchedArt] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved artId values
  const [savedArtIds, setSavedArtIds] = useState(getSavedArtIds());
  const [saveArt, { error }] = useMutation(SAVE_ART);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveArtIds(savedArtIds);
  }, );

  // create method to search for books and set state on form submit
  const handleSearchArtAPI = async (query) => {
    try {
      const response = await searchArtApi(query);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = await response.json();
      
    
       setSearchedArt(items.data);
       setSearchInput("");
    
     
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   handleSearchArtAPI('cat');
  // }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    handleSearchArtAPI(searchInput);
  };

  // create function to handle saving a book to our database
  const handleSaveArt = async (ArtId) => {
    // find the book in `searchedArt` state by the matching id
    const artToSave = searchArt.find((art) => art.artId === ArtId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveArt({
        variables: { items: { ...artToSave } },
      });
      console.log(savedArtIds);
      setSavedArtIds([...savedArtIds, artToSave.artId]);

      // if book successfully saves to user's account, save book id to state
      setSavedArtIds([...savedArtIds, artToSave.saveId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Art Painting</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a Art Painting"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchArt != null && searchArt.length > 0
            ? `Viewing ${searchArtApi.length} results:`
            : "Search for Art Painting"}
        </h2>
        <CardColumns>
          {searchArt.map((art) => {
           
            return (
              <Card key={art.id} border="dark">
                {art.image_id ? (
                  <Card.Img
                    src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                    alt={`The cover for ${art.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{art.title}</Card.Title>
                  <p className="small"> {}</p>
                  <Card.Text>{art.exhibition_history}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedArtIds?.some(
                        (savedartId) => savedartId === art.id
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveArt(art.id)}
                    >
                      {savedArtIds?.some(
                        (savedArtId) => savedArtId === art.id
                      )
                        ? "This art has already been saved!"
                        : "Save this Art!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchArt;
