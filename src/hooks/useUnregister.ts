import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useCallback } from 'react';

const GET_UNREGISTER_TOKEN = gql`
  query {
    unregister_token
  }
`;

const UNREGISTER = gql`
  mutation Unregister($token: String!) {
    unregister(token: $token)
  }
`;

export default function useUnregister() {
  const { refetch } = useQuery<{ unregister_token: string }>(
    GET_UNREGISTER_TOKEN,
    {
      skip: true,
    },
  );

  const [unregister] = useMutation<{ unregister: boolean }>(UNREGISTER);

  return useCallback(async () => {
    const { data } = await refetch();
    const { unregister_token: token } = data;
    await unregister({
      variables: {
        token,
      },
    });
    localStorage.clear();
    window.location.href = '/'; // LATER: redirect to link asking unregister reason
  }, [refetch, unregister]);
}
