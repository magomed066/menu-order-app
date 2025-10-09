import { Route, Routes } from 'react-router-dom'

import BaseLayout from '@/app/layouts/base'

import { privateRoutes, publicRoutes } from './routes'

const Routing = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        {privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}

export default Routing
