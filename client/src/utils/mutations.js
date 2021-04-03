import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_ART = gql`
	mutation saveArt($ArtData: ArtInput!) {
		saveArt(ArtData: $ArtData) {
			_id
			username
			email  
			savedArts {
				ArtId    
				image 
				description 
				title   
			}
		}
	}
`

export const REMOVE_ART = gql`
	mutation removeArt($ArtId: ID!) {
		removeArt(ArtId: $ArtId) {
			_id
			username
			email  
			savedArts {
				ArtId   
				image 
				description  
				title   
			}
		}
	}
`
