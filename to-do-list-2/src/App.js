import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import InCompleted from "./pages/InCompleted";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import { TaskProvider } from "./context/tasksContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
              background: 'green',
              color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
        }}
      />

      <TaskProvider>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="completed" element={<Completed />} />
            <Route path="incompleted" element={<InCompleted />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </div>
  );
}

export default App;
