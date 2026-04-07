import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "./router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import { AxiosInterceptor } from "./interceptors";

const queryClient = new QueryClient();

function App() {
  return (
    <AxiosInterceptor>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider router={router} />
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AxiosInterceptor>
  );
}

export default App;
