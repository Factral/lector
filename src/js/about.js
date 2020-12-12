"use strict";

const { remote } = require('electron');

document.getElementById('close').addEventListener('click', _ => {
    console.log('dawda');
    let window = remote.getCurrentWindow();
    window.close();
});
