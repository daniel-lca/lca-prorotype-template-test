import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { flowById, flowStartRoute } from './prototype/derive';
import { FlowBar } from './prototype/FlowBar';
import { PrototypeHome } from './prototype/PrototypeHome';
import { registry } from './prototype/registry';

// Routes are generated from src/prototype/registry.ts. Do not add screen routes by hand here.
//   /                 Prototype Home
//   /flow/:flowId     stable link that opens a flow's start screen
//   <screen.route>    one route per registered screen

function FlowEntry() {
  const { flowId = '' } = useParams();
  const flow = flowById(flowId);
  const route = flow && flowStartRoute(flow);
  return route ? <Navigate to={route} replace /> : <NotFound />;
}

function NotFound() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Screen not found</h1>
      <p className="mt-2 text-neutral-600">This route is not registered in the prototype.</p>
      <Link to="/" className="mt-4 inline-block underline">
        Go to prototype home
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrototypeHome />} />
        <Route path="/flow/:flowId" element={<FlowEntry />} />
        {registry.screens.map((screen) => {
          const ScreenComponent = screen.component;
          return (
            <Route
              key={screen.id}
              path={screen.route}
              element={
                <>
                  <FlowBar screen={screen} />
                  <ScreenComponent />
                </>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
