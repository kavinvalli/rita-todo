import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import Layout from '../components/Layout'
import { Admin, Authenticated, Guest } from '../lib/authorization'
import { IPageProps } from '../lib/types'
import useTitle from '../lib/use-title'

const Index: React.FC = () => {
  const {
    props: { user },
  } = usePage<IPageProps>()
  useTitle('Home')
  return (
    <Layout links={[]}>
      <div className="flex items-center justify-center h-full w-full px-5">
        <div className="bg-white w-full max-w-sm p-5 rounded-lg">
          <Link className="button my-3" href="/auth/login">
            Login
          </Link>
          <Link className="button my-3" href="/auth/register">
            Register
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Index
