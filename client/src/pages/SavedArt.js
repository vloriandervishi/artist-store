import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteArt } from '../utils/API';
import Auth from '../utils/auth';
import { removeArtId } from '../utils/localStorage';

const SavedArt = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the art's mongo _id value as param and deletes the art from the database
  const handleDeleteArt = async (artId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteArt(artId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove art's id from localStorage
      removeArtId(artId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved arts!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedart.length
            ? `Viewing ${userData.savedart.length} saved ${userData.savedart.length === 1 ? 'art' : 'art'}:`
            : 'You have no saved arts!'}
        </h2>
        <CardColumns>
          {userData.savedarts.map((art) => {
            return (
              <Card key={art.artId} border='dark'>
                {art.image ? <Card.Img src={art.image} alt={`The cover for ${art.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{art.title}</Card.Title>
                  <p className='small'>Authors: {art.authors}</p>
                  <Card.Text>{art.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteArt(art.artId)}>
                    Delete this art!
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
