import '@soundworks/helpers/polyfills.js';
import { Server } from '@soundworks/core/server.js';
import platformInitPlugin from '@soundworks/plugin-platform-init/server.js';
import * as NodeOsc from 'node-osc';
import globalSchema from './schemas/global.js';
// import { oscAddressToProp, oscPropToAddress } from './osc-routing.js';
import { propByAddress, addressByProp } from './osc-routing.js';

import { loadConfig } from '../utils/load-config.js';
import '../utils/catch-unhandled-errors.js';

// - General documentation: https://soundworks.dev/
// - API documentation:     https://soundworks.dev/api
// - Issue Tracker:         https://github.com/collective-soundworks/soundworks/issues
// - Wizard & Tools:        `npx soundworks`

const config = loadConfig(process.env.ENV, import.meta.url);

console.log(`
--------------------------------------------------------
- launching "${config.app.name}" in "${process.env.ENV || 'default'}" environment
- [pid: ${process.pid}]
--------------------------------------------------------
`);

/**
 * Create the soundworks server
 */
const server = new Server(config);

/**
 * Create the OSC client
 */
const oscSendPort = 3334;
const oscListenPort = 3333;

// configure the server for usage within this application template
server.useDefaultApplicationTemplate();

/**
 * Register plugins
 */
server.pluginManager.register('platform-init', platformInitPlugin);

/**
 * Register schemas
 */
server.stateManager.registerSchema('global', globalSchema);

const oscClient = new NodeOsc.Client('127.0.0.1', oscSendPort);

/**
 * Send OSC messages from schema updates
 */
const hook = server.stateManager.registerUpdateHook('global', (updates, values) => {
  for (let [key, value] of Object.entries(updates)) {
    const address = addressByProp[key];
    if (address) {
      const v = globalSchema[key].type === 'boolean'
                ? (value ? 1 : 0)
                : value;
      
      oscClient.send(address, v, () => { /* ... ack ? */ });
    }
  }
});

/**
 * Create shared state
 */
const globalState = await server.stateManager.create('global');

/**
 * Update global state from OSC messages
 */
const oscServer = new NodeOsc.Server(oscListenPort, '0.0.0.0', () => {
  console.log(`OSC server is listening on port ${oscListenPort}`)
});

oscServer.on('message', async (msg) => {
  const prop = propByAddress[msg[0]];
  if (prop) {
    const v = globalSchema[prop].type === 'boolean'
              ? msg[1] !== 0
              : msg[1];

    const updates = {};
    updates[prop] = v;
    await globalState.set(updates);
  }
});

/**
 * Launch application (init plugins, http server, etc.)
 */
await server.start();

// console.log(oscNamespace.getValues());
// server.stateManager.observe(async (schemaName, stateId, nodeId) => {
//   if (schemaName == 'osc-namespace') {
//     console.log(schemaName, stateId, nodeId);
//     const state = await server.stateManager.attach(schemaName, stateId);
//   }
// });

// and do your own stuff!

