import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_ART } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeArtId } from "../utils/localStorage";

const SavedArt = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeArt, { error }] = useMutation(REMOVE_ART);
  const userData = data?.me || {};
  //console.log(userData);
  // use this to determine if `useEffect()` hook needs to run again

  const handleDeleteART = async (ArtId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeArt({
        variables: { ArtId },
      });

      // upon success, remove book's id from localStorage
      removeArtId(ArtId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedArts.length
            ? `Viewing ${userData.savedArts.length} saved ${userData.savedArts.length === 1 ? 'art' : 'arts'}:`
            : 'You have no saved arts!'}
        </h2>
        <CardColumns>
          {userData.savedArts?.map((art) => {
            return (
              <Card key={art.ArtId} border="danger">
                {art.image? (
                  <Card.Img
                    src={art.image}
                    alt={`The cover for ${art.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{art.title}</Card.Title>
                  <p className="small"> {}</p>
                  <Card.Text>{art.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteART(art.ArtId)}
                  >
                    Delete this Art!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedArt;
