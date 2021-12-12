import { Link, useForm } from '@inertiajs/inertia-react'
import React from 'react'
import Layout from '../../components/Layout'
import TextInput from '../../components/TextInput'

interface iRegisterProps {
  error?: string
}

const Register: React.FC<iRegisterProps> = ({ error }: iRegisterProps) => {
  const { setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData(e.target.name as never, e.target.value as never)

  return (
    <Layout>
      <div className="flex items-center justify-center h-full w-full px-5">
        <div className="bg-white w-full max-w-sm p-5 rounded-lg">
          <div className="w-full flex items-center justify-start">
            <h1 className="text-xl font-bold">Register</h1>
          </div>
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault()
              post('/auth/register', {
                preserveState: true,
              })
            }}
          >
            <TextInput
              name="email"
              label="Email"
              placeholder="john@example.com"
              type="email"
              className="my-4"
              disabled={processing}
              error={errors.email}
              onChange={handleChange}
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="sup3rs3cr3tp4ssw0rd"
              type="password"
              className="my-4"
              disabled={processing}
              error={errors.password}
              onChange={handleChange}
            />

            {error && (
              <div className="input-group my-4">
                <div className="error">{error}</div>
              </div>
            )}

            <div className="input-group my-4">
              <div className="text-center text-sm text-gray-800">
                Already have an account?{' '}
                <Link className="font-semibold" href="/auth/login">
                  Login
                </Link>
              </div>
            </div>

            <div className="input-group my-4">
              <button type="submit" className="button w-full" disabled={processing}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register