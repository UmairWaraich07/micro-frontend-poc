# Micro Frontend Architecture with Vite and React

This proof of concept demonstrates a micro frontend architecture using Vite and React. The project consists of a host application and one micro frontend.

## Project Structure

```
micro-frontend-poc/
├── host/
│ ├── src/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
└── remote/
├── src/
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Implementation

### Host Application (host/src/App.jsx)

```jsx
import { useState } from "react";
import "./App.css";
import Button from "host/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Host application</h1>
      <Button />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
```

### Micro Frontend (remote/src/App.jsx)

```jsx
import { useState } from "react";
import "./App.css";
import Button from "./Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Remote application</h1>
      <Button />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
```

## Configuration

### Host Application (host/vite.config.js)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        host: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

### Micro Frontend (remote/vite.config.js)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./Button": "./src/Button.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

## Explanation of How It Works

1. **Project Structure:**
   The project is divided into two main parts: a host application and a remote application. Each part has its own Vite configuration and React components.

2. **Module Federation:**
   We use the Vite plugin for module federation (`@originjs/vite-plugin-federation`) to enable the micro frontend architecture. This plugin allows us to expose and consume modules across different applications.

3. **Exposing Modules:**
   In the micro frontend configuration (`remote/vite.config.js`), we expose the App component using the `exposes` option. This makes the component available for other applications to import.

4. **Consuming Modules:**
   In the host application configuration (`host/vite.config.js`), we define the `remotes` option to specify where to load the micro frontends from. This allows the host to dynamically import the exposed components from remote.

5. **Dynamic Imports:**
   In the host application (`host/src/App.jsx`), we use React's `lazy` and `Suspense` to dynamically import the micro frontend components. This ensures that the micro frontends are loaded only when needed, improving the application's performance.

6. **Shared Dependencies:**
   The `shared` option in the federation configuration ensures that common dependencies like React and ReactDOM are shared between the host and micro frontends, preventing duplicate loads and reducing bundle sizes.

7. **Independent Development:**
   Each micro frontend can be developed and deployed independently. They have their own `package.json` and can be run as standalone applications during development.

8. **Runtime Integration:**
   When the host application runs, it dynamically loads the micro frontends at runtime. This allows for independent deployment and updating of micro frontends without needing to redeploy the entire application.

## Running the POC

1. In each directory (`host`, `remote`), run `npm install` to install dependencies.

2. Start micro frontend:

   - In `remote`: `npm run build`,
     This generates a `dist` folder in the `remote` app containing a `remoteEntry.js` file.

   - Serve the remote app locally: `npm run preview`

3. Start the host application:
   - In `host`: `npm run dev`

Visit the host application in your browser, and you should see the micro frontends loaded and integrated into the host.
