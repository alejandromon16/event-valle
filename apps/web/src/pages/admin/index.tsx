// import React, { useEffect } from 'react';
// import Layout from '@/layouts/admin.layout';
// import { Text } from '@chakra-ui/react';
// import { useGetMeQuery } from '../../../types';
// import { useUserStore } from '@/stores/userStore';
// import AuthRouteGuard from '@/guards/AuthRouteGuard';

// function Index() {
//   // const { data, loading, error } = useGetMeQuery()
//   // const userStore = useUserStore();

//   // useEffect(() => {
//   //   if (data) {
//   //     console.log('this is data', data);
//   //     const roleNames = data.me.roles.map(role => role.name);
//   //     console.log('Role names:', roleNames);
//   //     userStore.setUser({ id: data.me.userId , roles: roleNames});
//   //   }
//   // }, [data]);

//   return (
//     <AuthRouteGuard>
//       <Text>Hello</Text>
//     </AuthRouteGuard>
//   );
// }

// export default Index;

import Layout from '@/components/layout'
import type { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'


const Page: NextPageWithLayout = () => {
  return <p>hello 2</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
     {page}
    </Layout>
  )
}

export default Page
