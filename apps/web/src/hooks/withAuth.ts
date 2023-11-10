import { GetServerSideProps } from 'next';
import { useAuthStore } from '@/stores/authStore';

export const withAuth = (PageComponent) => {
  return (props) => <PageComponent {...props} />;
};

// Define getServerSideProps to handle server-side redirection
export const getServerSideProps: GetServerSideProps = async (context) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticate);

  // Check if the user is not authenticated
  if (!isAuthenticated) {
    // Redirect to the desired URL
    return {
      redirect: {
        destination: '/', // Redirect to the home page or another URL
        permanent: false, // Set to true for permanent redirect (HTTP status 301) or false for temporary redirect (HTTP status 302)
      },
    };
  }

  // If the user is authenticated, return an empty object
  return {
    props: {},
  };
};
