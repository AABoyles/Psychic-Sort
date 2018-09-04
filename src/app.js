import { remote, ipcRenderer } from "electron";
import jetpack from "fs-jetpack";
import { greet } from "./hello_world/hello_world";
import env from "env";
import os from 'os';

import "./stylesheets/main.css";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

var address = 'http://', ip = '', port = 1024;
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(ifname => {
  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) return;
    ip = iface.address;
  });
});
address += ip;

document.querySelector("#ip").innerHTML = address;

ipcRenderer.on('get-port', (e, p) => {
  port = p;
  if(port !== 80) address += ':' + port;
  document.querySelector("#ip").innerHTML = address;
});

ipcRenderer.send('give-port');

import "./helpers/context_menu.js";
import "./helpers/external_links.js";
