// This file acts as a root-level entry point redirecting to the bundled production server
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("./dist/server.cjs");
